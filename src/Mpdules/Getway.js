/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {getCurrentUser} from '../Auth/auth';
import axios from '../Auth/axiosInstance';
import {useFocusEffect} from '@react-navigation/native';

const Getway = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [validationError, setValidationError] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [invoiceData, setInvoiceData] = useState([]);
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [step, setStep] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [subCategoryIndex, setSubCategoryIndex] = useState(0);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const currentUser = await getCurrentUser();
        const response = await axios.get('/users/progress', {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });

        if (response.data) {
          setProgressData(response.data);

          if (Array.isArray(response.data.vouchers)) {
            const mappedItems = response.data.vouchers.map(voucher => ({
              label: voucher.voucher_description,
              value: voucher.id,
            }));
            setItems(mappedItems);
          }
        } else {
          setError('Invalid response data');
        }
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  const currentCategoryData =
    progressData?.categories?.filter(
      category => category.status === 'in_progress',
    )[step] || {};
  const category = currentCategoryData.category || '';
  const type =
    currentCategoryData?.sub_categories?.filter(
      sub => sub.isdisabled !== true,
    )?.[subCategoryIndex]?.sub_category || '';

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        setError(null);
        if (category && type) {
          const url = `/${category}?type=${type}&isRefresh=true`;
          const currentUser = await getCurrentUser();
          const response = await axios.get(url, {
            headers: {
              Authorization: 'Bearer ' + currentUser.token,
            },
          });

          if (response.data) {
            setInvoiceData(response.data);
          }
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch invoice data');
      }
    };

    fetchInvoiceData();
  }, [category, type]);

  useFocusEffect(
    useCallback(() => {
      setValue(null);
    }, []),
  );

  const handleSubmit = () => {
    if (
      !progressData ||
      !progressData.categories ||
      !progressData.categories[step]
    ) {
      console.error('No data available for current step');
      setValidationError('No data available for the current step.');
      return;
    }

    const currentCategory =
      progressData.categories?.find(
        categoryItem => categoryItem.status === 'in_progress',
      ) || {};

    const subCategory = currentCategory.sub_categories?.filter(
      sub => sub.isdisabled !== true,
    )[subCategoryIndex];
    if (!subCategory) {
      setValidationError('Subcategory not found.');
      return;
    }

    const expectedVoucherDescription = subCategory?.voucher?.description || '';
    const selectedVoucherId = value;
    const selectedVoucher = items.find(
      item => item.value === selectedVoucherId,
    );
    const selectedVoucherDescription = selectedVoucher
      ? selectedVoucher.label
      : '';

    if (!selectedVoucherId) {
      setValidationError('Please select a voucher.');
      return;
    }

    const isValid = expectedVoucherDescription === selectedVoucherDescription;
    if (!isValid) {
      setValidationError(
        `Invalid selection. Please choose "${expectedVoucherDescription}" to proceed.`,
      );
      return;
    }

    // if (subCategory.total === subCategory.completed + 1) {
    navigation.navigate('VoucherPage');
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const currentCategory =
    progressData?.categories?.filter(
      categoryitem => categoryitem.status === 'in_progress',
    )[step] || {};
  const isSubCategories = currentCategory?.sub_categories.filter(
    sub => sub.isdisabled !== true,
  );
  const subCategoryCategory = isSubCategories[subCategoryIndex];
  return (
    <View style={styles.getbg}>
      <View style={styles.getflx}>
        <View style={styles.getcard}>
          {currentCategory && (
            <View style={styles.ofbizcard}>
              <View style={styles.waybg}>
                <Text style={styles.gettext}>Gateway of Bizzlab</Text>
              </View>
              <View style={styles.catflx}>
                <Text style={styles.gorytext}>Category:</Text>
                <Text style={styles.Directtext}>
                  {currentCategory.description}
                </Text>
              </View>
              <View style={styles.catflx}>
                <Text style={styles.gorytext}>Sub Category:</Text>
                <Text style={styles.Directtext}>
                  {subCategoryCategory?.description || 'N/A'}
                </Text>
              </View>
              <View style={styles.catflx}>
                <Text style={styles.gorytext}>Voucher Type:</Text>
                <View style={styles.Directtexts}>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Select a voucher type"
                    style={styles.dropDownPicker}
                    dropDownContainerStyle={[
                      styles.dropDownContainer,
                      {width: '100%'},
                    ]}
                    textStyle={styles.text}
                    placeholderStyle={styles.placeholder}
                    containerStyle={styles.containerStyle}
                  />
                </View>
              </View>
              {validationError ? (
                <Text style={styles.validationError}>{validationError}</Text>
              ) : null}
              <View style={[styles.conflx, {paddingTop: 15}]}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conflx: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  getbg: {
    backgroundColor: '#30BAF9',
    width: '100%',
    height: '100%',
  },
  getflx: {
    alignItems: 'center',
    padding: 20,
  },
  getcard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '90%',
    height: 310,
    padding: 20,
  },
  ofbizcard: {
    backgroundColor: '#E3EDF7',
    borderRadius: 20,
    width: '100%',
    height: '100%',
  },
  waybg: {
    backgroundColor: '#E3EDF7',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  gettext: {
    color: '#133D52',
    fontSize: 24,
    fontWeight: '700',
    padding: 5,
  },
  catflx: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    padding: 10,
  },
  gorytext: {
    color: '#133D52',
    fontSize: 24,
    width: '30%',
    textAlign: 'right',
  },
  Directtext: {
    color: '#fff',
    backgroundColor: '#4C8BDB',
    fontSize: 24,
    paddingLeft: 10,
    borderRadius: 5,
    width: '50%',
  },
  Directtexts: {
    width: '50%',
    height: 38,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 4,
    paddingHorizontal: 30,
    borderRadius: 20,
    width: 150,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    padding: 1,
  },
  validationError: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  dropDownPicker: {
    backgroundColor: '#fafafa',
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderRadius: 5,
  },
  dropDownContainer: {
    backgroundColor: '#fafafa',
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  placeholder: {
    fontSize: 16,
    color: '#aaa',
  },
  containerStyle: {
    width: '100%',
  },
});

export default Getway;
