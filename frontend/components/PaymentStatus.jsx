import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Message from "./Message";
import { Colors } from "../constants/Utils";

const PaymentStatus = ({ order }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Payment Method</Text>
      <Text style={styles.text}>
        <Text style={styles.strongText}>Method:</Text> {order.paymentMethod}
      </Text>

      {!order.isPaid && (
        <Message variant="error" style={styles.message}>
          Please proceed with your payment to complete your order.
        </Message>
      )}

      {order.isPaid && !order.isDelivered && (
        <Message variant="info" style={styles.message}>
          Thank you for your payment! We're preparing your order for delivery.
        </Message>
      )}

      <View
        style={[
          styles.statusBox,
          order.isPaid && styles.successStatus
        ]}
      >
        <Text style={styles.statusText}>
          {order.isPaid
            && `Successfully paid on ${new Date(order.paidAt).toLocaleString()}`
            }
        </Text>
      </View>

      <View
        style={[
          styles.statusBox,
          order.isDelivered && styles.successStatus,
          styles.statusBoxMarginTop,
        ]}
      >
        <Text style={styles.statusText}>
          {order.isDelivered
            && `Successfully delivered on ${new Date(
                order.deliveredAt
              ).toLocaleString()}`
           }
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    padding: 24,
    borderRadius: 12,
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.textColor,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: Colors.secondaryTextColor,
    lineHeight: 24,
    marginBottom: 4,
  },
  strongText: {
    fontWeight: "bold",
    color: Colors.primary,
  },
  message: {
    marginBottom: 16,
    
  },
  statusBox: {
  padding:10,
    borderRadius: 8,
    marginTop: 12,
    alignSelf: "flex-start",
  },
  statusBoxMarginTop: {
    marginTop: 8,
  },
  successStatus: {
    backgroundColor: Colors.successLight,
  },

  statusText: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.successBorder,
  },
});

export default PaymentStatus;
