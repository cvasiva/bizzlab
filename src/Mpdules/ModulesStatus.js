/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  Button,
} from 'react-native';
import axios from '../Auth/axiosInstance';
import {getCurrentUser} from '../Auth/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
export const Months = [
  ['April-4', 'May-5', 'June-6', 'July-7'],
  ['Aug-8', 'Sep-9', 'Oct-10', 'Nov-11'],
  ['Dec-12', 'Jan-1', 'Feb-2', 'March-3'],
];

export const MonthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const ModulesStatus = ({navigation}) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible3, setModalVisible3] = useState(false);
  const fetchDashboardData = async () => {
    // eslint-disable-next-line quotes
    const url = `/users/dashboard`;
    const currentUser = await getCurrentUser();
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: 'Bearer ' + currentUser.token,
        },
      });
      if (response && response.data) {
        setDashboardData(response.data);
      } else {
        throw new Error('Response data is undefined');
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const currentMonth =
    MonthNames[dashboardData?.user?.month - 1]?.toUpperCase();

  //   const categoriescompleted = dashboardData?.scores?.categories?.filter(
  //     category => category.status === 'in_progress',
  //   )[0];

  const renderMonthButtons = () =>
    Months.map((rowval, i) => (
      <View key={i} style={styles.row}>
        {rowval.map((sitem, j) => {
          const name = sitem.split('-')[0];
          const numval = sitem.split('-')[1];
          let progress = styles.bgPending;

          if (dashboardData?.user?.months_completed?.length > 0) {
            progress = dashboardData?.user?.months_completed.includes(
              Number(numval),
            )
              ? styles.bgCompleted
              : styles.bgPending;
          }

          if (Number(dashboardData?.user?.month) === Number(numval)) {
            progress = styles.bgInProgress;
          }

          return (
            <View key={j} style={styles.col}>
              <TouchableOpacity style={[styles.button, progress]}>
                <Text style={styles.buttonText}>{name}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    ));

  const renderCategoryRows = () =>
    dashboardData?.scores?.categories?.map((item, i) => (
      <View
        key={i}
        style={[styles.tableRow, i % 2 === 0 ? styles.rowEven : styles.rowOdd]}>
        <Text style={styles.tableCell}>{item.order}</Text>
        <Text style={[styles.tableCell, styles.textStart]}>
          {item.description}
        </Text>
        <Text style={styles.tableCell}>{item.completed}</Text>
        <Text style={styles.tableCell}>{item.total}</Text>
      </View>
    ));
  const totalBillsCompleted =
    dashboardData?.scores?.summary?.total_bills_completed ?? 0;
  const totalBillsToComplete =
    dashboardData?.scores?.summary?.total_bills_to_complete ?? 0;
  const totalCompletedBillsYear =
    dashboardData?.scores?.summary?.total_completed_bills_year ?? 0;
  const totalYearlyBills =
    dashboardData?.scores?.summary?.total_yearly_bills ?? 0;

  const overallScore = Math.round(
    (totalBillsCompleted / totalBillsToComplete) * 100,
  );

  const handlePageNext = () => {
    if (totalYearlyBills === totalCompletedBillsYear + 1) {
      setModalVisible3(true);
    } else {
      navigation.navigate('processing');
    }
  };

  const handlePageNextCategory = () => {
    navigation.navigate('mymodules');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.centeredRow}>
          <TouchableOpacity style={[styles.statusButton, styles.moduleMonth]}>
            <Text style={styles.buttonText}>Month Status</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.statusButton, styles.moduleMonth12]}>
            <Text style={styles.buttonText} onPress={handlePageNext}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
        <View>{renderMonthButtons()}</View>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>SI No.</Text>
            <Text style={[styles.headerCell, styles.textStart]}>CATEGORY</Text>
            <Text style={styles.headerCell}>BILLS PASSED/{currentMonth}</Text>
            <Text style={styles.headerCell}>TOTAL BILLS </Text>
          </View>
          {renderCategoryRows()}
        </View>
        <View style={styles.moduleContainer}>
          <View style={styles.row1}>
            <Text style={styles.moduleTitle}>YOUR PROGRESS - Module 1</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row1}>
            <View style={styles.col1}>
              <Text style={styles.scoreText}>{overallScore}%</Text>
              <Text style={styles.labelText}>OVERALL SCORE</Text>
            </View>
            <View style={styles.col1}>
              <Text style={styles.scoreText}>
                {totalBillsCompleted || ''}/{totalBillsToComplete || ''}
              </Text>
              <Text style={styles.labelText}>
                ENTERED/ <Text style={styles.overall}>{currentMonth}</Text>
              </Text>
            </View>
            <View style={[styles.col1]}>
              <Text style={[styles.scoreText, styles.centerText]}>
                {totalCompletedBillsYear}/{totalYearlyBills}
              </Text>
              <Text style={styles.labelText}>
                VOUCHER ENTERED/ <Text style={styles.overall}>OVERALL</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible3}
        onRequestClose={() => setModalVisible3(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent12}>
            <View>
              <View style={styles.containericon}>
                <Icon name="check-circle" size={50} color="green" />
              </View>
              <Text style={styles.category}>
                Successfully Completed Your Module
              </Text>
              <Button
                title={'Continue'}
                color="green"
                onPress={handlePageNextCategory}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containericon: {
    alignItems: 'center',
  },
  category: {
    color: '#808080',
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 30,
  },
  modalContent12: {
    width: 500,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 10,
  },
  overall: {
    color: '#ffd747',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 3,
  },
  centeredRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  moduleMonth: {
    width: '25%',
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#ffd129',
  },
  moduleMonth12: {
    width: '10%',
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#ffd129',
  },
  buttonText: {
    color: '#232323',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  col: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: '75%',
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  bgPending: {
    backgroundColor: '#e9eff6',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 9.33547,
    elevation: 5,
  },
  bgCompleted: {
    backgroundColor: '#4ba64f',
  },
  bgInProgress: {
    backgroundColor: '#1a73e7',
  },
  tableContainer: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#5f5ac7',
    padding: 10,
  },
  headerCell: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStart: {
    textAlign: 'left',
    paddingLeft: 10,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
  },
  rowEven: {
    backgroundColor: '#f2f2f2',
  },
  rowOdd: {
    backgroundColor: '#fff',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: '#000',
  },
  moduleContainer: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#1cabe9',
    margin: 10,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  col1: {
    flex: 1,
    paddingHorizontal: 5,
  },
  moduleTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#555',
    marginVertical: 5,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  labelText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
});

export default ModulesStatus;
