package com.example.daon.bbs.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileResponse {
    private String fileLink;
    private String fileName;
    private String originalName;
    private UUID fileId;
    private UUID boardId;
    private long fileSize;
    private int download;
}
