// components/pdf/InvoiceDocument.js
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  heading: { fontSize: 20, marginBottom: 10 },
  text: { fontSize: 12 },
});

export default function InvoiceDocument({ booking }) {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>INVOICE</Text>
          <Text style={styles.text}>Booking ID: {booking._id}</Text>
          <Text style={styles.text}>Guest Phone: {booking.userId.phone}</Text>
          <Text style={styles.text}>Room: {booking.roomId.roomName}</Text>
          <Text style={styles.text}>Amount: ${booking.rent}</Text>
          <Text style={styles.text}>Due Date: {new Date(booking.dueDate).toLocaleDateString()}</Text>
        </View>
      </Page>
    </Document>
  );
}
