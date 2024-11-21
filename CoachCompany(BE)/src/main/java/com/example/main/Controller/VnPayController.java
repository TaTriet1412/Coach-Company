package com.example.main.Controller;

import com.example.main.Service.VnPayService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/payments")
@Controller
public class VnPayController {
    @Autowired
    private VnPayService vnPayService;


    @GetMapping("")
    public String home(){
        return "index";
    }


    @PostMapping("/vnpay")
    public ResponseEntity<Map<String, String>> submidOrder(
            @RequestParam("amount") int orderTotal,
            @RequestParam("orderInfo") String orderInfo,
            @RequestParam("ticketId") Long ticketId,
            HttpServletRequest request) {
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + "4200";
        String vnpayUrl = vnPayService.createOrder(orderTotal, orderInfo, baseUrl, ticketId);

        Map<String, String> response = new HashMap<>();
        response.put("redirectUrl", vnpayUrl);

        return ResponseEntity.ok(response);
    }


    @GetMapping("/afterPayed")
    public ResponseEntity<Object> GetMapping(HttpServletRequest request, Model model){
        int paymentStatus =vnPayService.orderReturn(request);

        String orderInfo = request.getParameter("vnp_OrderInfo");
        String paymentTime = request.getParameter("vnp_PayDate");
        String transactionId = request.getParameter("vnp_TransactionNo");
        String totalPrice = request.getParameter("vnp_Amount");

        model.addAttribute("orderId", orderInfo);
        model.addAttribute("totalPrice", totalPrice);
        model.addAttribute("paymentTime", paymentTime);
        model.addAttribute("transactionId", transactionId);

//        return paymentStatus == 1 ? "ordersuccess" : "orderfail";
        return ResponseEntity.ok(paymentStatus);
    }
}