import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
  },
});

const InvoiceDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Invoice</Text>
      <View style={styles.section}>
        <Text>Customer: {data.customer}</Text>
        <Text>Date: {data.date}</Text>
      </View>
      <View style={styles.section}>
        <Text>Amount: ${data.amount}</Text>
      </View>
    </Page>
  </Document>
);

export default InvoiceDocument;
