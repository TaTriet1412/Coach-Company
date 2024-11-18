package com.example.main.FileHandle;
import org.apache.tika.Tika;
import org.apache.tika.mime.MimeTypeException;
import java.io.IOException;
import java.io.InputStream;
import org.springframework.web.multipart.MultipartFile;

public class FileChecker {
    public boolean isImage(MultipartFile file) {
        Tika tika = new Tika();
        try (InputStream stream = file.getInputStream()) {
            String mimeType = tika.detect(stream);
            return mimeType.startsWith("image/");
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }
}
