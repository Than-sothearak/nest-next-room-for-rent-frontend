// Remove "use client" as this component is rendered server-side by @react-pdf/renderer
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  heading: { fontSize: 20, marginBottom: 10 },
  text: { fontSize: 12, marginBottom: 4 },
});

const InvoiceDocument = ({ booking }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>🏠 Room Invoice</Text>
        <Text style={styles.text}>Booking ID: {booking._id}</Text>
        <Text style={styles.text}>Guest Phone: {booking.userId?.phone}</Text>
        <Text style={styles.text}>Room: {booking.roomId?.roomName}</Text>
        <Text style={styles.text}>Rent: ${booking.rent}</Text>
        <Text style={styles.text}>Deposit: ${booking.deposit}</Text>
        <Text style={styles.text}>
          Due Date: {new Date(booking.dueDate).toLocaleDateString()}
        </Text>
        <Text style={styles.text}>
          Issued At: {new Date().toLocaleDateString()}
        </Text>
      </View>
    </Page>
  </Document>
);

export default InvoiceDocument;
