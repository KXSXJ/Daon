package com.example.daon.ledger.dto.request;

import com.example.daon.customer.model.CustomerCate;
import com.example.daon.stock.model.StockCate;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class LedgerRequest {
    private LocalDateTime searchSDate;  //검색 날짜 시작일
    private LocalDateTime searchEDate;  //검색 날짜 종료일
    private CustomerCate customerCate;//구분
    private UUID affiliationId;//소속
    private UUID customerId; //거래처아이디
    private List<UUID> customerIds; //거래처아이디(복수거래처)
    private UUID stockId;//품명
    private String OfficialId;//관리비분류
    private StockCate stockCate;
    private UUID stockCateId;
    //-----------------
    private boolean sales;//매출
    private boolean purchase;// 매입
    private boolean deposit;// 입금
    private boolean withdrawal;// 출금
    private boolean salesDiscount;// 매출할인
    private boolean purchaseDiscount;// 매입할인
    private boolean returnOut;// 반품출고
    private boolean returnIn;// 반품입고
}
