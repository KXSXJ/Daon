package com.example.daon.estimate.model;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.company.model.CompanyEntity;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.estimate.dto.request.EstimateRequest;
import com.example.daon.task.model.TaskEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity(name = "estimate")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EstimateEntity {
    //견적서
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "estimate_id", columnDefinition = "BINARY(16)")
    private UUID estimateId;

    //고객
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private CustomerEntity customer;

    //생성일
    @Column(name = "estimate_date", nullable = false)
    private LocalDateTime estimateDate;

    //전표화 날짜
    @Column(name = "receipt_date")
    private LocalDateTime receiptDate;

    //전표화 여부
    @Column(name = "receipted", nullable = false)
    private boolean receipted;

    //총금액
    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;

    //등록자
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    //회사
    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private CompanyEntity company;

    //품목 목록
    @OneToMany(mappedBy = "estimate", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EstimateItem> items;

    @OneToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "task_id")
    private TaskEntity task;

    @Column(name = "memo")
    private String memo;

    // === 필드 업데이트 메서드 ===

    /**
     * 전체 필드 업데이트
     */
    public void updateFields(CustomerEntity customer, CompanyEntity company, UserEntity user, EstimateRequest estimateRequest) {
        if (customer != null) {
            this.customer = customer;
        }
        if (company != null) {
            this.company = company;
        }
        if (user != null) {
            this.user = user;
        }
        this.estimateDate = estimateRequest.getEstimateDate().atStartOfDay();
        // 금액 재계산
        recalculateTotalAmount();
    }

    /**
     * 항목 리스트 동기화
     */
    private void syncItems(List<EstimateItem> newItems) {
        // 기존 항목 삭제 (orphanRemoval 설정으로 자동 삭제)
        if (this.items != null) {
            this.items.clear();
        } else {
            this.items = new ArrayList<>();
        }
        // 새로운 항목 추가
        newItems.forEach(item -> {
            item.setEstimate(this); // 양방향 연관 관계 설정
            this.items.add(item);
        });
    }

    /**
     * 총 금액 재계산
     */
    private void recalculateTotalAmount() {
        this.totalAmount = this.items.stream()
                .map(item -> item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
