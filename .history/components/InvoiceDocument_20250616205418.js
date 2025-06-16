import { formatDate } from '@/utils/formatDate';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    textAlign: 'center',
    fontSize: 14,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 6,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  tableCell: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 5,
    textAlign: 'center',
  },
  // Column widths
  no: { width: '5%' },
  type: { width: '35%', textAlign: 'left' },
  room: { width: '10%' },
  level: { width: '10%' },
  price: { width: '10%' },
  qty: { width: '10%' },
  dff: { width: '10%' },
  amount: { width: '10%' },
  paymentSection: {
    marginTop: 10,
  },
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

const InvoicePDF = ({ data }) => {

  const items = [
    { no: 1, type: 'One bedroom unit for June (01/06/25 - 30/06/25)', room: 'E108', level: '1st Fl', price: 160, qty: 1, dff: 0, amt: 160 },
    { no: 2, type: 'Piped water supply (3pax)', room: '', level: '', price: 10, qty: 1, dff: 0, amt: 10 },
    { no: 3, type: 'Extra moto parking', room: '', level: '', price: 5, qty: 2, dff: 0, amt: 10 },
  ];

  const subtotal = items.reduce((sum, item) => sum + item.amt, 0);
  const deposit = 0;
  const total = subtotal;
  const balance = total - deposit;
const getData = JSON.parse(JSON.stringify(data))
  return (
    <Document>
      <Page style={styles.page} size="A4">
        {/* Header */}
        <View style={styles.header}>
          <Image style={styles.logo} src="http://localhost:3000/images/logo.jpg"/>
          <View>
            <Text>WBC LOGEMENT</Text>
            <Text>Building Lot #1317, St. 2014, Phnom Penh, Cambodia</Text>
            <Text>Tel: (855) 12 30 99 30</Text>
            <Text>Email: wbc.logement@gmail.com</Text>
            <Text>Website: www.wbclogement.com</Text>
          </View>
          <View>
            <Text>No. 00113</Text>
            <Text>Date: {data.dueDate}</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Debit Note</Text>

        {/* To Section */}
        <View style={styles.section}>
          <Text>To: Atn Mrs. THAN Sothearak</Text>
          <Text>Tel: 096 512 1285</Text>
        </View>

        {/* Table */}
        <View style={styles.table}>
          {/* Header Row */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.no]}>No.</Text>
            <Text style={[styles.tableCell, styles.type]}>Type of Room</Text>
            <Text style={[styles.tableCell, styles.room]}>Room #</Text>
            <Text style={[styles.tableCell, styles.level]}>Level</Text>
            <Text style={[styles.tableCell, styles.price]}>Unit Price</Text>
            <Text style={[styles.tableCell, styles.qty]}>Qty</Text>
            <Text style={[styles.tableCell, styles.dff]}>DFF (%)</Text>
            <Text style={[styles.tableCell, styles.amount]}>Amount</Text>
          </View>

          {/* Table Rows */}
          {items.map((item, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.no]}>{item.no}</Text>
              <Text style={[styles.tableCell, styles.type]}>{item.type}</Text>
              <Text style={[styles.tableCell, styles.room]}>{item.room}</Text>
              <Text style={[styles.tableCell, styles.level]}>{item.level}</Text>
              <Text style={[styles.tableCell, styles.price]}>${item.price.toFixed(2)}</Text>
              <Text style={[styles.tableCell, styles.qty]}>{item.qty}</Text>
              <Text style={[styles.tableCell, styles.dff]}>{item.dff}</Text>
              <Text style={[styles.tableCell, styles.amount]}>${item.amt.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text>Sub-total: ${subtotal.toFixed(2)}</Text>
          <Text>TOTAL: ${total.toFixed(2)}</Text>
          <Text>Deposit: ${deposit.toFixed(2)}</Text>
          <Text>Balance: ${balance.toFixed(2)}</Text>
        </View>

        {/* Payment Method */}
        <View style={styles.paymentSection}>
          <Text>Method of Payment:</Text>
          <Text>ABA - Mr. Meas Borarethy and Ms. Tun Bopha - 012 309 930 (USD)</Text>
          <Text>ACLEDA - Mr. Meas Borarethy - 0001-00231646-14 (USD)</Text>
        </View>

        {/* Signatures */}
        <View style={styles.signatureSection}>
          <Text>Authorized Signature: __________________</Text>
          <Text>Tenant's Signature: __________________</Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Thank you for your business!
        </Text>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
