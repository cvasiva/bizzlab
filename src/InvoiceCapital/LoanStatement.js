/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';

const LoanStatement = ({invoice_data}) => {
  let loanStatement = invoice_data?.loan_borrowed || []; // Default data
  const accountDetails = invoice_data?.loan_details || {};

  // Determine the correct loan statement based on sub_category
  switch (invoice_data?.sub_category) {
    case 'loan_borrowed':
      loanStatement = invoice_data.loan_borrowed;
      break;
    case 'loan_interest_accrual':
      loanStatement = invoice_data.loan_intrest_accrual;
      break;
    case 'loan_interest_payment':
      loanStatement = invoice_data.loan_intrest_payment;
      break;
    case 'loan_principal_repayment':
      loanStatement = invoice_data.loan_principal_repayment;
      break;
    default:
      break;
  }

  // Calculations
  const closingBalance =
    loanStatement.length > 0
      ? loanStatement[loanStatement.length - 1].total
      : 0;

  const totalCredit = loanStatement.reduce(
    (acc, item) => acc + (item.credit || 0),
    0,
  );
  const totalDebit = loanStatement.reduce(
    (acc, item) => acc + (item.debit || 0),
    0,
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.bankName}>Axis Bank</Text>
      </View>

      <View style={styles.accountDetailsstle}>
        <View>
          {[
            ['Account Branch', accountDetails.account_branch],
            ['Account Number', accountDetails.loan_account_no],
          ].map(([label, value], index) => (
            <View style={styles.row} key={index}>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.label}>{value || ''}</Text>
            </View>
          ))}
        </View>
        <View>
          {[
            ['Account Type', accountDetails.account_type],
            ['Statement Date', accountDetails.statement_date],
          ].map(([label, value], index) => (
            <View style={styles.row} key={index}>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.label}>{value || ''}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.tableContainer}>
        <Text style={styles.tableHeader}>Loan Statement</Text>
        <FlatList
          data={loanStatement}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View
              style={[styles.tableRow, item.highlight && styles.highlightRow]}>
              <Text style={styles.tableCell}>{item.date || ''}</Text>
              <Text style={styles.tableCell}>{item.description || 'NA'}</Text>
              <Text style={styles.tableCell}>
                {item.debit
                  ? new Intl.NumberFormat('en-IN').format(item.debit)
                  : '-'}
              </Text>
              <Text style={styles.tableCell}>
                {item.credit
                  ? new Intl.NumberFormat('en-IN').format(item.credit)
                  : '-'}
              </Text>
              <Text style={styles.tableCell}>
                {item.total
                  ? new Intl.NumberFormat('en-IN').format(item.total)
                  : 'NA'}
              </Text>
            </View>
          )}
        />
      </View>
      <Text style={styles.boldText}>Transaction Summary</Text>
      <View style={styles.accountDetailsstle}>
        <View style={styles.summaryContainer}>
          {[
            ['Total Debit', totalDebit],
            ['Total Credit', totalCredit],
            ['Total Finance', accountDetails.total_finance],
            ['Closing Balance', closingBalance],
          ].map(([label, value], index) => (
            <View style={styles.row} key={index}>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.label}>
                {new Intl.NumberFormat('en-IN').format(value || 0)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.row1}>
          <View>
            <Text style={styles.label}>Interest Charged</Text>
            <Text style={styles.label}>Advance Payment</Text>
            <Text style={styles.label}>Redraw Available</Text>
          </View>
          <View>
            <Text style={styles.label}>
              {accountDetails.loan_interest_rate}%
            </Text>
            <Text style={styles.label}>
              {accountDetails.advance_payment || 'NA'}
            </Text>
            <Text style={styles.label}>
              {accountDetails.redraw_available || 'NA'}
            </Text>
          </View>
        </View>
        <View style={styles.row1}>
          <View>
            <Text style={styles.label}>Amount in Arrears</Text>
            <Text style={styles.label}>Charges in Arrears</Text>
            <Text style={styles.label}>Accrued Interest</Text>
          </View>
          <View>
            <Text style={styles.label}>
              {accountDetails.amount_in_arrears || 'NA'}
            </Text>
            <Text style={styles.label}>
              {accountDetails.charges_in_arrears || 'NA'}
            </Text>
            <Text style={styles.label}>
              {accountDetails.accrued_interest || 'NA'}
            </Text>
          </View>
        </View>
      </View>

      {/* Additional Information */}
      <View style={styles.additionalInfo}>
        <Text style={styles.boldText}>Additional Information</Text>
        <Text style={styles.label}>
          Notice for payments by mail: If you’re mailing a payment, please print
          the form below and include it in the envelope. Be sure to write your
          loan number in the memo of the check and make your check out to
          scratch service, LLC.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  accountDetailsstle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flexGrow: 1,
    padding: 16,
  },
  label: {
    color: '#000',
    fontSize: 14,
  },
  header: {
    backgroundColor: '#97144d',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    color: '#000',
  },
  button: {
    width: '20%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '50%',
  },
  bankName: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
  detailsContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 2,
    gap: 20,
  },
  row1: {
    flexDirection: 'row',
    marginVertical: 2,
    marginLeft: 16,
    gap: 20,
  },
  col: {
    flex: 1,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  tableContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  highlightRow: {
    backgroundColor: '#f0f8ff',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: '#000',
  },
  summaryContainer: {
    paddingHorizontal: 16,
    color: '#000',
  },
  additionalInfo: {
    marginTop: 16,
    // paddingHorizontal: 16,
    color: '#000',
  },
});

export default LoanStatement;
