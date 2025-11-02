import { formatDate } from "@/utils/formatDate";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
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
  text: { fontSize: 25 },
  logo: { width: 90, height: 90 },
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
  section: { marginTop: 6, marginBottom: 6 },
  totals: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-end",
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
  tableRow: { flexDirection: "row" },
  tableHeader: { backgroundColor: "#f0f0f0", fontWeight: "bold" },
  textBold: { fontWeight: "bold" },
  tableCell: {
    borderStyle: "solid",
    borderColor: "#000",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 5,
    textAlign: "center",
  },
  // Column widths
  no: { width: "5%" },
  type: { width: "35%", textAlign: "left" },
  room: { width: "10%" },
  level: { width: "10%" },
  price: { width: "10%" },
  qty: { width: "10%" },
  dff: { width: "10%" },
  amount: { width: "10%" },
  paymentSection: { marginTop: 10 },
  signatureSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 90,
    position: "relative",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    marginTop: 20,
    textAlign: "center",
    fontStyle: "italic",
  },
});

const InvoicePageView = ({ data }) => {
  const getData = JSON.parse(JSON.stringify(data));

  // ---------- helpers
  const toNum = (v, fallback = 0) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
  };

  const firstNonEmptyArray = (...candidates) =>
    candidates.find((arr) => Array.isArray(arr) && arr.length) || [];

  // base fields (support both shapes)
  const baseAmount = toNum(getData?.amount ?? getData?.rent, 0);
  const category =
    getData?.category ??
    getData?.bookingId?.category ??
    "Room Rent";

  const start = getData?.startDate ?? getData?.bookingId?.startDate;
  const due = getData?.dueDate ?? getData?.bookingId?.dueDate;

  const roomObj = getData?.roomId || getData?.bookingId?.roomId || {};
  const roomName =
    (typeof roomObj === "object" ? roomObj?.roomName : "") || "";
  const floor =
    (typeof roomObj === "object" ? roomObj?.floor : "") || "";

  const invIdRaw =
    getData?.invoiceId ?? getData?.bookingId?.invoiceId ?? "";
  const invId = String(invIdRaw).padStart(5, "0");

  const deposit = toNum(getData?.deposit, 0);

  // extras: prefer services, fallback to properties (support nested under bookingId too)
  const extrasSource = firstNonEmptyArray(
    getData?.services,
    getData?.properties,
    getData?.bookingId?.services,
    getData?.bookingId?.properties
  );

  const extraRows = extrasSource.map((it, idx) => {
    const price = toNum(
      it?.price ?? it?.values ?? it?.amount ?? it?.unitPrice,
      0
    );
    const qty = toNum(it?.qty ?? it?.quantity, 1);
    const off = toNum(it?.off ?? it?.discount, 0); // percent
    const amt = price * qty * (1 - off / 100);

    return {
      no: idx + 2,
      type: it?.part ?? it?.name ?? it?.title ?? it?.label ?? it?.type ?? "",
      room: "",
      level: "",
      price,
      qty,
      off,
      amt,
    };
  });

  // base rent row
  const baseRow = {
    no: 1,
    type: `${category} (${formatDate(start)} - ${formatDate(due)})`,
    room: roomName,
    level: floor,
    price: baseAmount,
    qty: 1,
    off: 0,
    amt: baseAmount,
  };

  // items
  const items = [baseRow, ...extraRows];

  // totals
  const subtotal = items.reduce((sum, it) => sum + toNum(it.amt, 0), 0);
  const total = subtotal;        // if deposit already paid
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
            <Text>No. {invId}</Text>
            <Text>Date: {formatDate(start)}</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Debit Note</Text>

        {/* To Section */}
        <View style={styles.section}>
          <Text>To: {getData?.userId?.username ?? getData?.bookingId?.userId?.username ?? "Tenant"}</Text>
          <Text>Tel: {getData?.userId?.phone ?? getData?.bookingId?.userId?.phone ?? "-"}</Text>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.no]}>No.</Text>
            <Text style={[styles.tableCell, styles.type]}>Description</Text>
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
                ${toNum(item.price).toFixed(2)}
              </Text>
              <Text style={[styles.tableCell, styles.qty]}>{item.qty}</Text>
              <Text style={[styles.tableCell, styles.dff]}>{toNum(item.off).toFixed(0)}</Text>
              <Text style={[styles.tableCell, styles.amount]}>
                ${toNum(item.amt).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totals}>
          <View style={{ minWidth: "140px" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: "8px" }}>
              <Text>Sub-total:</Text>
              <Text>${subtotal.toFixed(2)}</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: "8px" }}>
              <Text>Deposit:</Text>
              <Text>${deposit.toFixed(2)}</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: "8px" }}>
              <Text style={styles.textBold}>Total:</Text>
              <Text style={styles.textBold}>${total.toFixed(2)}</Text>
            </View>

            {/* Optional balance row */}
            {/* <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.textBold}>Balance:</Text>
              <Text style={styles.textBold}>${balance.toFixed(2)}</Text>
            </View> */}
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.paymentSection}>
          <Text>Method of Payment:</Text>
          <Text>ABA - Mr. Meas Borarethy and Ms. Tun Bopha - 012 309 930 (USD)</Text>
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

export default InvoicePageView;
