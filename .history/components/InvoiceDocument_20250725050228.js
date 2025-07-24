import { formatDate } from "@/utils/formatDate";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    paddingTop: 10,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  underHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  text: {
    fontSize: 25,
  },
  logo: {
    width: 90,
    height: 90,
  },
  signature: {
    position: "absolute",
    width: 90,
    height: 90,
    top: -30,
    left: 50,
  },
  title: {
    textAlign: "center",
    fontSize: 14,
    marginVertical: 10,
    fontWeight: "bold",
  },
  section: {
    marginTop: 6,
    marginBottom: 6,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
  tableCell: {
    borderStyle: "solid",
    borderColor: "#000",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 5,
    textAlign: "center",
  },
  no: { width: "5%" },
  type: { width: "35%", textAlign: "left" },
  room: { width: "10%" },
  level: { width: "10%" },
  price: { width: "10%" },
  qty: { width: "10%" },
  dff: { width: "10%" },
  amount: { width: "10%" },
  paymentSection: {
    marginTop: 10,
  },
  signatureSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 90,
    position: "relative",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontStyle: "italic",
  },
});

const InvoicePDF = ({ data }) => {
  const getData = JSON.parse(JSON.stringify(data));

  const items = [
    {
      no: 1,
      type: `${getData?.roomId?.category?.category} (${formatDate(
        getData.startDate
      )} - ${formatDate(getData.dueDate)})`,
      room: getData?.roomId?.roomName || "",
      level: getData?.roomId?.floor || "",
      price: Number(getData.rent),
      qty: 1,
      dff: 0,
      amt: Number(getData.rent),
    },
    ...(Array.isArray(getData?.properties)
      ? getData.properties.map((item, index) => ({
          no: index + 2,
          type: item?.part,
          room: "",
          level: "",
          price: Number(item?.values),
          qty: 1,
          dff: 0,
          amt: Number(item?.values),
        }))
      : []),
  ];

  const subtotal = items.reduce((sum, item) => sum + item.amt, 0);
  const deposit = Number(0);
  const total = subtotal;
  const balance = total - deposit;

  return (
    <Document>
      <Page style={styles.page} size="A4">
        {/* Header */}
        <View style={styles.header}>
          <Image
            style={styles.logo}
            src="https://next-room-for-rent.vercel.app/images/logo.jpg"
          />
          <View>
            <Text style={styles.text}>Logement (WBC)</Text>
          </View>
        </View>

        <View style={styles.underHeader}>
          <View>
            <Text>Building Lot #1317, St. 2014, Phnom Penh, Cambodia</Text>
            <Text>Tel: (855) 12 30 99 30</Text>
            <Text>Email: wbc.logement@gmail.com</Text>
            <Text>Website: www.wbclogement.com</Text>
          </View>

          <View>
            <Text>No. {getData._id?.slice(-8)}</Text>
            <Text>Date: {formatDate(getData.startDate)}</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Debit Note</Text>

        {/* To Section */}
        <View style={styles.section}>
          <Text>To: {getData.userId?.username || "Tenant"}</Text>
          <Text>Tel: {getData.userId?.phone || "-"}</Text>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.no]}>No.</Text>
            <Text style={[styles.tableCell, styles.type]}>Type of Room</Text>
            <Text style={[styles.tableCell, styles.room]}>Room #</Text>
            <Text style={[styles.tableCell, styles.level]}>Level</Text>
            <Text style={[styles.tableCell, styles.price]}>Unit Price</Text>
            <Text style={[styles.tableCell, styles.qty]}>Qty</Text>
            <Text style={[styles.tableCell, styles.dff]}>OFF (%)</Text>
            <Text style={[styles.tableCell, styles.amount]}>Amount</Text>
          </View>

          {items.map((item, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.no]}>{item.no}</Text>
              <Text style={[styles.tableCell, styles.type]}>{item.type}</Text>
              <Text style={[styles.tableCell, styles.room]}>{item.room}</Text>
              <Text style={[styles.tableCell, styles.level]}>{item.level}</Text>
              <Text style={[styles.tableCell, styles.price]}>
                ${item.price.toFixed(2)}
              </Text>
              <Text style={[styles.tableCell, styles.qty]}>{item.qty}</Text>
              <Text style={[styles.tableCell, styles.dff]}>{item.dff}</Text>
              <Text style={[styles.tableCell, styles.amount]}>
                ${item.amt.toFixed(2)}
              </Text>
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
          <Text>
            ABA - Mr. Meas Borarethy and Ms. Tun Bopha - 012 309 930 (USD)
          </Text>
          <Text>ACLEDA - Mr. Meas Borarethy - 0001-00231646-14 (USD)</Text>
        </View>

        {/* Signatures */}
        <View style={styles.signatureSection}>
          <View style={styles.signature}>
            <Image
              style={styles.signature}
              src="https://next-room-for-rent.vercel.app/images/signature.png"
            />
          </View>
          <Text>Authorized Signature: _______Owner_name</Text>
          <Text>Tenant' Signature: __________________</Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>Thank you for your business!</Text>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
