/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import ReceiverSignature from '../Invoice/ReceiverSignature';
import AuthorisedSignature from '../Invoice/AuthorisedSignature';
// import moment from 'moment';

const PurchaseScreen = ({invoice_data}) => {
  const terms = {
    scope: {
      title: '1.	Scope',
      point_1:
        '1.1.	This Purchase Order shall constitute the contract (“Order”).',
      point_2:
        '1.2.	In the event of any terms and conditions given by the Supplier are at variance with these terms and conditions, then these terms and condition shall prevail. However, if there is any valid contract subsisting between the parties then the agreed contractual terms and conditions will supersede the general terms of the order, in event of any conflict or otherwise.',
    },
    packing_price: {
      title: '2.	Packing, Price',
      discription:
        'Goods processed and supplied against this order must be properly packed and dispatched conforming to special instructions, if any, given for safe transport by road/rail/air/water to the specified destination',
    },
    delivery_term: {
      title: '3.	Delivery Term and Penalty for Breach',
      point:
        '3.1.	Delivery time is the essence of this order and must be strictly adhered to. If the Supplier fails to deliver the goods in time, the Purchaser may, at its sole discretion:',
      options: {
        optain_a:
          '(a)	treat the order as cancelled at any time and recover any loss or damage from the Supplier;',
        optain_b:
          '(b)	without prejudice to above provision Purchaser may accept late delivery, subject to a deduction in payment of 1% of the total PO price for every week or part thereof of the delay, towards liquidated damages, subject to maximum deduction of 10% of the PO price',
      },
    },
    order_conformation: {
      title: '4.	Order and Confirmation of Order',
      point_1:
        '4.1.	The Purchaser may cancel the order if the Supplier has not confirmed acceptance of the order (confirmation) in writing within two weeks of receipt. If the terms of the confirmation vary from the terms of the order, the Purchaser is only bound thereby if it agrees to such variation in writing.',
      point_2:
        '4.2.	Any amendments or additions or alterations to the order shall only be effective if the Purchaser confirms such in writing.',
    },
    force_majeure: {
      title: '5.	Force Majeure',
      point_1:
        '5.1.	The Purchaser shall be under no liability for failure to accept the deliveries of goods, if such acts of failure are due to any act of God, fire, earthquake, floods, or any natural calamities or transportation embargoes, civil commotion, riots, violence, acts of terrorists, state enemies, or any other similar reasons or circumstances beyond the control of the Purchaser.',
      point_2:
        '5.2.	Such occurrences shall be informed in writing by the Supplier.',
    },
    examination: {
      title: '6.	Examination/Rejection of Goods',
      point_1:
        '6.1.	All materials duly processed and supplied against the order should conform to latest Indian Standards, it should be new, merchantable quality, fit for their intended purpose and should be in line with “Quality Assurance Plan”, if any, which has to be approved in advance by the Purchaser. All such materials will be subject to inspection and approval by the Purchaser, either at the Supplier’s premises and/or at the place of delivery indicated by the Purchaser.',
      point_2:
        '6.2.	The Purchaser reserves the rights to inspect the material at any stage during manufacture or supply and reject such portion thereof as may be found defective or not in conformity with the specification or not fit for their intended purpose without invalidating the remainder of the order, if so desired by the Purchaser. All rejected material shall be removed by the Supplier at its own costs within 15 days from the date of rejection note / intimation / Challan posted by the Purchaser to the Supplier. In case of any failure due to any reasons to remove the goods/material the Purchaser shall have all rights to remove the defective materials/goods from the Purchaser’s/its customer’s premises and discard it.',
      point_3:
        '6.3.	The Purchaser under no circumstances will be liable or held accountable for any damage, loss, deterioration of the rejected materials/goods for discarding the material/goods, or for any value for it. The Purchaser shall also be entitled to charge an amount of 5% (of the value of rejected materials) per every week of the delay towards storage charges.',
    },
    product_warranty: {
      title: '7.Product Warranty',
      point_1:
        '7.1.	The said good/services processed and delivered by the Supplier shall be made out of good quality bought out components/materials, as acceptable to the Purchaser and it should have standard/excellent workmanship and fit for their intended purpose.',
      point_2:
        '7.2.	The said goods/services delivered by the Supplier shall be identical to the sample specification given by the Supplier.',
    },
    guarantee: {
      title: '8.	Guarantee',
      discription:
        '8.1.	The Supplier shall be bound to repair/replace free of cost any materials / goods / assets / services processed and supplied by him, which become defective due to faulty design, material or workmanship or any other reason within 18 months from the date of completion of final installation & commissioning or 24 months from the date of delivery whichever is earlier. In all such cases the to and fro freight and insurance charges will be to the Supplier’s account.',
    },
    invoices_and_payments: {
      title: '9.	Invoices and Payments',
      point_1:
        '9.1.	The bills for supplies must be submitted in triplicate duly bearing the Supplier’s sale tax registration numbers, supported with the required forms as specified in the order and showing the description of material, quantity, Purchase Order no. Supplier code number, challan no. and date, GRN number with date, Excise duty gate pass number with date, and value wherever applicable',
      point_2:
        '9.2.	The bill must be accompanied by the Supplier’s challan duty receipted by the Purchaser. Challan accompanying the goods/services should indicate the Purchase Order number, date, gate pass number and value etc. wherever applicable.',
      point_3:
        '9.3.	Payment of service/processing charges for goods delivered, provided they are not rejected by the Purchaser shall be made as per the terms stated in the order. Payment falls due after the stipulated/agreed credit period from the date of receipt of materials or from the date of receipt of bills, whichever is later. Bills should be submitted within 4 days from the date of delivery. For local suppliers, Digitally Signed regulatory compliant invoices shall be accepted and processed for payment when sent to apindiadigitalinvoicescanning.in@siemens.com within 4 days from the date of delivery the Purchaser shall at all point of time have all rights to deduct from any unpaid bills, debit notes falling due in case any goods/services are rejected online and/or any claims for deductions are raised on the Supplier.',
    },
    tax_companies: {
      title: '10.	Tax Compliance',
      discription:
        '10.1.	It is to be noted that Supplier are required to discharge all the taxes, cess and duties including but not limited to GST which are charged on an invoice/claimed from The Purchaser and payable to the Government on their respective due dates. Supplier are also required to ensure complete compliance in this regard as per the applicable law in force in India. In the event of any default noticed by The Purchaser in adhering to the aforementioned obligations, either from its own enquiry or from a enquiry from any statutory authority or on account of any disallowance of any input tax credit to The Purchaser, The Purchaser reserves its right to recover or deduct the tax amount so defaulted along with interest and penalty as per the applicable laws, without prejudice to any other remedies available to The Purchaser. Furthermore, the payments will be released to you only after all the relevant documents as required by The Purchaser and the statutory authorities to receive the tax input credit has been duly submitted by Supplier to The Purchaser',
    },
  };
  const condition = terms;
  const Purchase_order = invoice_data.po || {};

  //   const color = '#F0F0F0';

  const formatted_amount = amount => {
    return `₹${new Intl.NumberFormat('en-IN').format(amount)}`;
  };

  const subtotal = Purchase_order?.lineItems.reduce(
    (acc, item) => acc + item.amount,
    0,
  );

  const color = '#01b99d';
  const backgcolor = '#000';
  return (
    <ScrollView>
      <View>
        <View
          style={[
            styles.header12,
            {backgroundColor: color, color: backgcolor},
          ]}>
          <View>
            <Image
              style={styles.logo}
              source={require('../Images/nisha_steel_n_alloys.png')}
              resizeMode="contain"
            />
          </View>
          <View style={styles.headerRight}>
            <View>
              <Text style={styles.textcolorewhit}>
                {Purchase_order?.company?.companyname}
              </Text>
              <Text style={styles.textcolorewhit}>
                {Purchase_order?.company?.address_1}{' '}
              </Text>
              <Text style={styles.textcolorewhit}>
                {Purchase_order?.company?.city},
                {Purchase_order?.company?.pin_code},{' '}
                {Purchase_order?.company?.state}{' '}
              </Text>
              <View style={styles.row}>
                <Text style={styles.textcolorewhit}>GST No. : </Text>
                <Text style={styles.textcolorewhit}>
                  {Purchase_order?.company?.gstin}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.headerLeft}>
            <Text style={styles.greenTextorder}>Purchase Order</Text>
            <View style={styles.col6}>
              <View style={styles.row}>
                <Text style={styles.textcolorewhit}>PO No.</Text>
                <Text style={styles.textcolorewhit}>
                  : {Purchase_order?.po_no}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.textcolorewhit}>PO Date</Text>
                <Text style={styles.textcolorewhit}>
                  : {Purchase_order.po_date || ''}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.fullWidthflx}>
          <View>
            <Text style={[styles.bold, styles.greenText]}>To:</Text>
            <View style={styles.marginLeft}>
              <Text style={styles.textcolore}>
                {Purchase_order?.supplier.companyname}
              </Text>
              <Text
                style={
                  styles.textcolore
                }>{`${Purchase_order?.supplier.address_1} ${Purchase_order?.supplier.city}, ${Purchase_order?.supplier.pin_code}, ${Purchase_order?.supplier.state}`}</Text>
            </View>
          </View>
          <View style={styles.lineborder} />
          <View>
            <View style={[styles.row, styles.marginLeft]}>
              <Text style={styles.textcolore}>GST No: </Text>
              <Text>
                <Text style={styles.textcolore}>{Purchase_order?.gstin}</Text>
              </Text>
            </View>
            <View style={[styles.row, styles.marginLeft]}>
              <Text style={styles.textcolore}>Payment Terms:</Text>
              <Text>
                <Text style={styles.textcolore}>
                  {Purchase_order.supplier.payment_term_days
                    ? `${Purchase_order.supplier.payment_term_days} Days`
                    : ''}
                </Text>
              </Text>
            </View>
            <View style={[styles.row, styles.marginLeft]}>
              <Text style={styles.textcolore}>Purchaser Name:</Text>
              <Text>
                <Text style={styles.textcolore}>Mahindra</Text>
              </Text>
            </View>
            <View style={[styles.row, styles.marginLeft]}>
              <Text style={styles.textcolore}>Purchaser No:</Text>
              <Text>
                <Text style={styles.textcolore}>9845785963</Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.fullWidth}>
          <View style={[styles.row, styles.headerBackground]}>
            <Text style={[styles.col1, styles.textcolore]}>S.No</Text>
            <Text style={[styles.col3, styles.textcolore]}>Description</Text>
            <Text style={[styles.col2, styles.textcolore]}></Text>
            <Text style={[styles.col2, styles.textcolore]}>Qty/Kg</Text>
            <Text style={[styles.col2, styles.textcolore]}>Rate</Text>
            <Text style={[styles.col2, styles.textcolore]}>Amount</Text>
          </View>
          {Purchase_order?.lineItems.map((item, i) => (
            <View style={[styles.row, styles.paddlin]} key={i}>
              <Text style={[styles.col1, styles.textcolore]}>{i + 1}</Text>
              <Text style={[styles.col3, styles.textcolore]}>
                {item.description}
              </Text>
              <Text style={[styles.col2, styles.textcolore]}></Text>
              <Text style={[styles.col2, styles.textcolore]}>{item.qty}</Text>
              <Text style={[styles.col2, styles.textcolore]}>
                {new Intl.NumberFormat('en-IN').format(item.rate)}
              </Text>
              <Text style={[styles.col2, styles.textcolore]}>
                {new Intl.NumberFormat('en-IN').format(item.amount)}
              </Text>
            </View>
          ))}
          <View style={styles.lineborder} />
          <View style={styles.row}>
            <View style={styles.col7} />
            <Text style={[styles.col3, styles.textcolore]}>Sub Total</Text>
            <Text style={[styles.col2, styles.textcolore]}>
              {formatted_amount(subtotal)}
            </Text>
          </View>
          {Purchase_order.cgst_total > 0 && (
            <>
              <View style={styles.row}>
                <View style={styles.col7} />
                <Text style={[styles.col3, styles.textcolore]}>
                  CGST {Purchase_order?.cgst_percentage}%
                </Text>
                <Text style={[styles.col2, styles.textcolore]}>
                  {formatted_amount(Purchase_order?.cgst_total)}
                </Text>
              </View>
            </>
          )}
          {Purchase_order.sgst_total > 0 && (
            <>
              <View style={styles.row}>
                <View style={styles.col7} />
                <Text style={[styles.col3, styles.textcolore]}>
                  SGST {Purchase_order?.sgst_percentage}%
                </Text>
                <Text style={[styles.col2, styles.textcolore]}>
                  {formatted_amount(Purchase_order?.sgst_total)}
                </Text>
              </View>
            </>
          )}
          {Purchase_order.igst_total > 0 && (
            <>
              <View style={styles.row}>
                <View style={styles.col7} />
                <Text style={[styles.col3, styles.textcolore]}>
                  IGST: {Purchase_order?.igst_percentage}%
                </Text>
                <Text style={[styles.col2, styles.textcolore]}>
                  {formatted_amount(Purchase_order?.igst_total)}
                </Text>
              </View>
            </>
          )}
          <View style={[styles.row, {backgroundColor: color}]}>
            <View style={styles.col7} />
            <Text style={[styles.col3, styles.textcolore]}>Total</Text>
            <Text style={[styles.col2, styles.textcolore]}>
              {formatted_amount(Purchase_order?.total)}
            </Text>
          </View>
        </View>

        <View style={[styles.row, {padding: 10}]}>
          <Text style={[styles.col4, styles.textcolore, {fontWeight: '700'}]}>
            Total Amount in words
          </Text>
          <Text style={[styles.col8, styles.textcolore]}>
            {Purchase_order?.amount_words}
          </Text>
        </View>

        <View style={[styles.row, styles.border]}>
          <View style={[styles.row, styles.spaceBetween]}>
            <ReceiverSignature
              companyNameSignature={Purchase_order.supplier.companyname}
            />
            <AuthorisedSignature
              companyNameSignature={Purchase_order.company.companyname}
            />
          </View>
          <View style={[styles.row, styles.spaceBetween]}>
            <Text style={styles.textcolore}>Receiver Signature</Text>
            <Text style={styles.textcolore}>Authorised Signature</Text>
          </View>
        </View>

        <View style={[styles.row, {justifyContent: 'flex-end'}]}>
          <View
            style={[styles.paddingVertical, {backgroundColor: color}]}></View>
        </View>

        <View style={styles.container}>
          <Text style={[styles.header123, styles.textCenter]}>
            TERMS AND CONDITIONS
          </Text>

          <Text style={styles.bold12}>{condition.scope.title}</Text>
          <Text style={styles.textcolore}>{condition.scope.point_1}</Text>
          <Text style={styles.textcolore}>{condition.scope.point_2}</Text>

          <Text style={styles.bold12}>{condition.packing_price.title}</Text>
          <Text style={styles.textcolore}>
            {condition.packing_price.discription}
          </Text>

          <Text style={styles.bold12}>{condition.delivery_term.title}</Text>
          <Text style={styles.textcolore}>{condition.delivery_term.point}</Text>
          <Text style={styles.textcolore}>
            {condition.delivery_term.options.optain_a}
          </Text>
          <Text style={styles.textcolore}>
            {condition.delivery_term.options.optain_b}
          </Text>

          <Text style={styles.bold12}>
            {condition.order_conformation.title}
          </Text>
          <Text style={styles.textcolore}>
            {condition.order_conformation.point_1}
          </Text>
          <Text style={styles.textcolore}>
            {condition.order_conformation.point_2}
          </Text>

          <Text style={styles.bold12}>{condition.examination.title}</Text>
          <Text style={styles.textcolore}>{condition.examination.point_1}</Text>
          <Text style={styles.textcolore}>{condition.examination.point_2}</Text>
          <Text style={styles.textcolore}>{condition.examination.point_3}</Text>

          <Text style={styles.bold12}>{condition.product_warranty.title}</Text>
          <Text style={styles.textcolore}>
            {condition.product_warranty.point_1}
          </Text>
          <Text style={styles.textcolore}>
            {condition.product_warranty.point_2}
          </Text>

          <Text style={styles.bold12}>{condition.guarantee.title}</Text>
          <Text style={styles.textcolore}>
            {condition.guarantee.discription}
          </Text>

          <Text style={styles.bold12}>
            {condition.invoices_and_payments.title}
          </Text>
          <Text style={styles.textcolore}>
            {condition.invoices_and_payments.point_1}
          </Text>
          <Text style={styles.textcolore}>
            {condition.invoices_and_payments.point_2}
          </Text>
          <Text style={styles.textcolore}>
            {condition.invoices_and_payments.point_3}
          </Text>

          <Text style={styles.bold12}>{condition.tax_companies.title}</Text>
          <Text style={[styles.paddingBottom, styles.textcolore]}>
            {condition.tax_companies.discription}
          </Text>
        </View>
        <View style={styles.container12}>
          <View
            style={[
              styles.box,
              {
                backgroundColor: color,
                color: backgcolor,
                paddingTop: 3,
                paddingBottom: 3,
                marginBottom: 5,
              },
            ]}></View>
          <View
            style={[
              styles.box,
              {
                backgroundColor: color,
                color: backgcolor,
                marginBottom: 5,
                paddingTop: 8,
                paddingBottom: 8,
              },
            ]}></View>
          <View
            style={[
              styles.box,
              {
                backgroundColor: color,
                color: backgcolor,
                paddingTop: 3,
                paddingBottom: 3,
              },
            ]}></View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bold12: {
    color: '#000',
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 5,
  },
  header123: {
    color: '#DC952B',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 16,
    padding: 8,
  },
  textCenter: {
    textAlign: 'center',
  },
  paddingBottom: {
    paddingBottom: 16,
  },
  greenTextorder: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 20,
  },
  paddlin: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  container12: {
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  box: {
    marginBottom: 5,
  },
  container: {
    flex: 1,
    width: 600,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 600,
  },
  header12: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingVertical: 10,
    width: 600,
  },
  headerLeft: {
    flex: 5,
  },
  headerRight: {
    flex: 7,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  col1: {
    flex: 1,
  },
  col2: {
    flex: 2,
  },
  col3: {
    flex: 3,
  },
  col4: {
    flex: 4,
  },
  col5: {
    flex: 5,
  },
  col6: {
    flex: 6,
  },
  col7: {
    flex: 7,
  },
  col8: {
    flex: 8,
  },
  col9: {
    flex: 9,
  },
  fullWidth: {
    width: '100%',
    paddingTop: 15,
  },
  fullWidthflx: {
    width: 400,
    paddingTop: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lineborder: {
    borderWidth: 0.5,
    borderColor: 'gray',
    marginLeft: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginVertical: {
    marginVertical: 5,
  },
  //   marginHorizontal: {
  //     marginHorizontal: 10,
  //   },
  marginLeft: {
    marginLeft: 10,
  },
  paddingTop: {
    paddingTop: 10,
  },
  paddingVertical: {
    paddingVertical: 10,
  },
  spaceBetween: {
    justifyContent: 'space-around',
  },
  bold: {
    fontWeight: '600',
    // color: '#000',
  },
  textcolore: {
    color: '#000',
  },
  textcolorewhit: {
    color: '#fff',
    fontWeight: '600',
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    paddingTop: 20,
  },
  headerBackground: {
    backgroundColor: '#00B257',
    color: '#FFFFFF',
    padding: 5,
  },
  greenText: {
    color: '#00B257',
  },
  greenText12: {
    backgroundColor: '#E3EDF7',
    color: '#fff',
    fontWeight: '800',
    fontSize: 18,
    paddingHorizontal: 8,
    height: 80,
    marginTop: -10,
    borderBottomRightRadius: 80,
    paddingTop: 30,
  },
  logo: {
    width: 50,
    height: 50,
  },
  border: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
  },
});

export default PurchaseScreen;
