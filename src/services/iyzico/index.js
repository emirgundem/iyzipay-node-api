import Iyzipay, { CURRENCY, LOCALE } from "iyzipay";
import * as Installments from "./methods/installments.js";
import * as Cards from "./methods/cards.js";
import * as Payments from "../iyzico/methods/payment";
import * as ThreeDsPayment from "../iyzico/methods/threeDsPayment";
import * as Checkouts from '../iyzico/methods/checkouts'
import * as CancelPayment from '../iyzico/methods/cancelPayment'
import * as RefundPayment from '../iyzico/methods/refundPayments'
import nanoid from "../../utils/nanoid.js";
import * as Logs from "../../utils/logs.js";

const createUserAndCards = () => {
  Cards.createUserCard({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    email: "email@email.com",
    externalId: nanoid(),
    card: {
      cardAlias: "Kredi Kartım",
      cardHolderName: "John Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
    },
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("1-cards-kullanıcı-ve-kart-olustur", result);
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile("1-cards- kullanıcı-ve-kart-olustur-hata", err);
    });
};

const createCardForUser = () => {
  Cards.createUserCard({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    email: "email@email.com",
    externalId: nanoid(),
    cardUserKey: "IsVS4wxwo3OhVWFYdIouWopNMtk=",
    card: {
      cardAlias: "Kredi Kartım",
      cardHolderName: "John Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
    },
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("2-cards- bir-kullanıcıya-kart-ekle", result);
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile("2-cards- bir-kullanıcıya-kart-ekle-hata", err);
    });
};

const readCardOfUser = () => {
  Cards.getUserCards({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    cardUserKey: "IsVS4wxwo3OhVWFYdIouWopNMtk=",
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("3-cards- bir-kullanıcının-kartını-oku", result);
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile("3-cards- bir-kullanıcının-kartını-oku-hata", err);
    });
};

const deleteCardOfAUser = () => {
  Cards.deleteUserCard({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    cardUserKey: "IsVS4wxwo3OhVWFYdIouWopNMtk=",
    cardToken: "J6E1VpdklhARn1hjBZQeAQBnO9w=",
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("4-cards- bir-kullanıcının-kartını-sil", result);
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile("4-cards- bir-kullanıcının-kartını-sil-hata", err);
    });
};

//deleteCardOfAUser();
//readCardOfUser();

//createUserAndCards();
//createCardForUser();

/*******************************INSTALLMENTS*****************************************/

const checkInstallments = () => {
  return Installments.checkInstallments({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    binNumber: "552879",
    price: "1000",
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("5-installments- bir-kart-ve ücret taksitlendirme ", result);
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile(
        "5-installments- bir-kart-ve-ücret-taksitlendirme-hata",
        err
      );
    });
};

//checkInstallments();

//Normal Ödeme

const createPayment = () => {
  return Payments.createPayment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    price: "300",
    paidPrice: "300",
    currency: CURRENCY.TRY,
    installment: "1",
    basketId: "B4TYUSW",
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    paymentCard: {
      cardAlias: "Kredi Kartım",
      cardHolderName: "John Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
      cvc: "123",
      registerCard: "0",
    },
    buyer: {
      id: "SDFJKL",
      name: "John",
      surname: "Doe",
      gsmNumber: "05385194056",
      email: "email@email.com",
      identityNumber: "00000000000",
      lastLoginDate: "2022-05-04 20:14: 35",
      registarionDate: "2022-01-04 19:14: 35",
      registrationAddress: "Nidakule göztepe Merdivenköy mah Bora sokak no : 1",
      ip: "85.34.78.112",
      city: "Istanbul",
      country: "Turkey",
      zipCode: "34732",
    },
    shippingAddress: {
      contactName: "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule göztepe, Merdivenköy mah Bora sokak no : 1",
      zipCode: "34732",
    },

    billingAddress: {
      contactName: "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule göztepe, merdivenköy mah Bora sok no : 1",
    },

    basketItems: [
      {
        id: "BT101",
        name: "İphone 12 Pro",
        category1: "Telefonlar",
        category1: "İOS Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 90,
      },
      {
        id: "BT102",
        name: "İphone 13 mini",
        category1: "Telefonlar",
        category1: "İOS Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 150,
      },

      {
        id: "BT103",
        name: "İphone 8 Plus",
        category1: "Telefonlar",
        category1: "İOS Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 60,
      },
    ],
  })

    .then((result) => {
      console.log(result);
      Logs.logFile("6- Yeni bir kartla ödeme al ve kartı kaydetme", result);
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile("6- Yeni bir kartla ödeme al ve kartı kaydetme - Hata", err);
    });
};

//createPayment()

const createPaymentAndSaveCard = () => {
  return Payments.createPayment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    price: "300",
    paidPrice: "300",
    currency: CURRENCY.TRY,
    installment: "1",
    basketId: "B4TYUSW",
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    paymentCard: {
      cardUserKey: "IsVS4wxwo3OhVWFYdIouWopNMtk=",
      cardAlias: "Kredi Kartım Ödemeden Sonra",
      cardHolderName: "John Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
      cvc: "123",
      registerCard: "1",
    },
    buyer: {
      id: "SDFJKL",
      name: "John",
      surname: "Doe",
      gsmNumber: "05385194056",
      email: "email@email.com",
      identityNumber: "00000000000",
      lastLoginDate: "2022-05-04 20:14: 35",
      registarionDate: "2022-01-04 19:14: 35",
      registrationAddress: "Nidakule göztepe Merdivenköy mah Bora sokak no : 1",
      ip: "85.34.78.112",
      city: "Istanbul",
      country: "Turkey",
      zipCode: "34732",
    },
    shippingAddress: {
      contactName: "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule göztepe, Merdivenköy mah Bora sokak no : 1",
      zipCode: "34732",
    },

    billingAddress: {
      contactName: "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule göztepe, merdivenköy mah Bora sok no : 1",
    },

    basketItems: [
      {
        id: "BT101",
        name: "İphone 12 Pro",
        category1: "Telefonlar",
        category1: "İOS Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 90,
      },
      {
        id: "BT102",
        name: "İphone 13 mini",
        category1: "Telefonlar",
        category1: "İOS Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 150,
      },

      {
        id: "BT103",
        name: "İphone 8 Plus",
        category1: "Telefonlar",
        category1: "İOS Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 60,
      },
    ],
  })

    .then((result) => {
      console.log(result);
      Logs.logFile("7- Yeni bir kartla ödeme al ve kartı kaydet", result);
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile("7- Yeni bir kartla ödeme al ve kartı kaydet - Hata", err);
    });
};

//createPaymentAndSaveCard();

const createPaymentWithSavedCard = () => {
  return Payments.createPayment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    price: "300",
    paidPrice: "300",
    currency: CURRENCY.TRY,
    installment: "1",
    basketId: "B4TYUSW",
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    paymentCard: {
      cardUserKey: "IsVS4wxwo3OhVWFYdIouWopNMtk=",
      cardToken: "6Jtaj/4iNHadcPz4vKmZfhrV210=",
    },
    buyer: {
      id: "SDFJKL",
      name: "John",
      surname: "Doe",
      gsmNumber: "05385194056",
      email: "email@email.com",
      identityNumber: "00000000000",
      lastLoginDate: "2022-05-04 20:14: 35",
      registarionDate: "2022-01-04 19:14: 35",
      registrationAddress: "Nidakule göztepe Merdivenköy mah Bora sokak no : 1",
      ip: "85.34.78.112",
      city: "Istanbul",
      country: "Turkey",
      zipCode: "34732",
    },
    shippingAddress: {
      contactName: "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule göztepe, Merdivenköy mah Bora sokak no : 1",
      zipCode: "34732",
    },

    billingAddress: {
      contactName: "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule göztepe, merdivenköy mah Bora sok no : 1",
    },

    basketItems: [
      {
        id: "BT101",
        name: "İphone 12 Pro",
        category1: "Telefonlar",
        category1: "İOS Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 90,
      },
      {
        id: "BT102",
        name: "İphone 13 mini",
        category1: "Telefonlar",
        category1: "İOS Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 150,
      },

      {
        id: "BT103",
        name: "İphone 8 Plus",
        category1: "Telefonlar",
        category1: "İOS Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 60,
      },
    ],
  })

    .then((result) => {
      console.log(result);
      Logs.logFile("8- Kayıtlı kartla ödeme al", result);
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile("8- Kayıtlı kartla ödeme al- Hata", err);
    });
};

//createPaymentWithSavedCard();
const initializeThreeDSPayments = () => {
  return ThreeDsPayment.initThreeDsPayment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    price: "300",
    paidPrice: "300",
    currency: CURRENCY.TRY,
    installment: "1",
    basketId: "B4TYUSW",
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    callbackUrl: "https://localhost/api/payment/3ds/complete",

    paymentCard: {
      cardUserKey: "IsVS4wxwo3OhVWFYdIouWopNMtk=",
      cardToken: "6Jtaj/4iNHadcPz4vKmZfhrV210=",
    },
    buyer: {
      id: "SDFJKL",
      name: "John",
      surname: "Doe",
      gsmNumber: "05385194056",
      email: "email@email.com",
      identityNumber: "00000000000",
      lastLoginDate: "2022-05-04 20:14: 35",
      registarionDate: "2022-01-04 19:14: 35",
      registrationAddress: "Nidakule göztepe Merdivenköy mah Bora sokak no : 1",
      ip: "85.34.78.112",
      city: "Istanbul",
      country: "Turkey",
      zipCode: "34732",
    },
    shippingAddress: {
      contactName: "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule göztepe, Merdivenköy mah Bora sokak no : 1",
      zipCode: "34732",
    },

    billingAddress: {
      contactName: "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule göztepe, merdivenköy mah Bora sok no : 1",
    },

    basketItems: [
      {
        id: "BT101",
        name: "İphone 12 Pro",
        category1: "Telefonlar",
        category1: "İOS Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 90,
      },
      {
        id: "BT102",
        name: "İphone 13 mini",
        category1: "Telefonlar",
        category1: "İOS Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 150,
      },

      {
        id: "BT103",
        name: "İphone 8 Plus",
        category1: "Telefonlar",
        category1: "İOS Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 60,
      },
    ],
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("9- 3ds ile ödeme", result);
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile("9- 3ds ile ödeme -hata", err);
    });
};

//initializeThreeDSPayments();


const completeThreeDsPayment = () => {
    return ThreeDsPayment.completeThreeDsPayment({

        locale : Iyzipay.LOCALE.TR,
        conversationId : nanoid(),
        paymentId : '17504960',
        conversationData : "conversation data"

    }).then((result)=>{
        console.log(result)
        Logs.logFile('10-3DS ödeme tamamla',result)
    }).catch((err)=>{
        console.log(err);
        Logs.logFile('10-3DS ödeme tamamla -Hata',err)
    })
}


//completeThreeDsPayment();

const initializeThreeDSPaymentsWithRegisteredCard = () => {
    return ThreeDsPayment.initThreeDsPayment({
      locale: Iyzipay.LOCALE.TR,
      conversationId: nanoid(),
      price: "300",
      paidPrice: "300",
      currency: CURRENCY.TRY,
      installment: "1",
      basketId: "B4TYUSW",
      paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      callbackUrl: "https://localhost/api/payment/3ds/complete",
  
      paymentCard: {
        cardUserKey: "IsVS4wxwo3OhVWFYdIouWopNMtk=",
        cardToken: "6Jtaj/4iNHadcPz4vKmZfhrV210=",
      },
      buyer: {
        id: "SDFJKL",
        name: "John",
        surname: "Doe",
        gsmNumber: "05385194056",
        email: "email@email.com",
        identityNumber: "00000000000",
        lastLoginDate: "2022-05-04 20:14: 35",
        registarionDate: "2022-01-04 19:14: 35",
        registrationAddress: "Nidakule göztepe Merdivenköy mah Bora sokak no : 1",
        ip: "85.34.78.112",
        city: "Istanbul",
        country: "Turkey",
        zipCode: "34732",
      },
      shippingAddress: {
        contactName: "John Doe",
        city: "Istanbul",
        country: "Turkey",
        address: "Nidakule göztepe, Merdivenköy mah Bora sokak no : 1",
        zipCode: "34732",
      },
  
      billingAddress: {
        contactName: "John Doe",
        city: "Istanbul",
        country: "Turkey",
        address: "Nidakule göztepe, merdivenköy mah Bora sok no : 1",
      },
  
      basketItems: [
        {
          id: "BT101",
          name: "İphone 12 Pro",
          category1: "Telefonlar",
          category1: "İOS Telefonlar",
          itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
          price: 90,
        },
        {
          id: "BT102",
          name: "İphone 13 mini",
          category1: "Telefonlar",
          category1: "İOS Telefonlar",
          itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
          price: 150,
        },
  
        {
          id: "BT103",
          name: "İphone 8 Plus",
          category1: "Telefonlar",
          category1: "İOS Telefonlar",
          itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
          price: 60,
        },
      ],
    })
      .then((result) => {
        console.log(result);
        Logs.logFile("11- kayıtlı bir kart 3ds ile ödeme", result);
      })
      .catch((err) => {
        console.log(err);
        Logs.logFile("11- kayıtlı bir kart 3ds ile ödeme -hata", err);
      });
  };

  //initializeThreeDSPaymentsWithRegisteredCard();


  const initializeThreeDSPaymentsWithNewCardAndRegister = () => {
    return ThreeDsPayment.initThreeDsPayment({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        price: "300",
        paidPrice: "300",
        currency: CURRENCY.TRY,
        installment: "1",
        basketId: "B4TYUSW",
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        callbackUrl: "https://localhost/api/payment/3ds/complete",

        paymentCard: {
            cardUserKey: "IsVS4wxwo3OhVWFYdIouWopNMtk=",
            cardAlias: "Kredi Kartım Ödemeden Sonra",
            cardHolderName: "John Doe",
            cardNumber: "5528790000000008",
            expireMonth: "12",
            expireYear: "2030",
            cvc: "123",
            registerCard: "1",
          },
        buyer: {
          id: "SDFJKL",
          name: "John",
          surname: "Doe",
          gsmNumber: "05385194056",
          email: "email@email.com",
          identityNumber: "00000000000",
          lastLoginDate: "2022-05-04 20:14: 35",
          registarionDate: "2022-01-04 19:14: 35",
          registrationAddress: "Nidakule göztepe Merdivenköy mah Bora sokak no : 1",
          ip: "85.34.78.112",
          city: "Istanbul",
          country: "Turkey",
          zipCode: "34732",
        },
        shippingAddress: {
          contactName: "John Doe",
          city: "Istanbul",
          country: "Turkey",
          address: "Nidakule göztepe, Merdivenköy mah Bora sokak no : 1",
          zipCode: "34732",
        },
    
        billingAddress: {
          contactName: "John Doe",
          city: "Istanbul",
          country: "Turkey",
          address: "Nidakule göztepe, merdivenköy mah Bora sok no : 1",
        },
    
        basketItems: [
          {
            id: "BT101",
            name: "İphone 12 Pro",
            category1: "Telefonlar",
            category1: "İOS Telefonlar",
            itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
            price: 90,
          },
          {
            id: "BT102",
            name: "İphone 13 mini",
            category1: "Telefonlar",
            category1: "İOS Telefonlar",
            itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
            price: 150,
          },
    
          {
            id: "BT103",
            name: "İphone 8 Plus",
            category1: "Telefonlar",
            category1: "İOS Telefonlar",
            itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
            price: 60,
          },
        ],
      })
        .then((result) => {
          console.log(result);
          Logs.logFile("11- kayıtlı bir kart 3ds ile ödeme", result);
        })
        .catch((err) => {
          console.log(err);
          Logs.logFile("11- kayıtlı bir kart 3ds ile ödeme -hata", err);
        });
  }

  //initializeThreeDSPaymentsWithNewCardAndRegister()



  /*-------------------------------------------------------*/
  /*----- CHECKOUT-----*/
  /*-------------------------------------------------------*/


//Checkout içerisinde bir ödeme başlat
  const initializeCheckoutForm = () => {
      return Checkouts.initialize(
        {
            locale: Iyzipay.LOCALE.TR,
            conversationId: nanoid(),
            price: "300",
            paidPrice: "300",
            currency: CURRENCY.TRY,
            installment: "1",
            basketId: "B4TYUSW",
            paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
            paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
            callbackUrl: "https://localhost/api/checkout/complete/payment",
            cardUserKey: "IsVS4wxwo3OhVWFYdIouWopNMtk=",
            enabledInstallments: [1,2,3,6,9],
            buyer: {
              id: "SDFJKL",
              name: "John",
              surname: "Doe",
              gsmNumber: "05385194056",
              email: "email@email.com",
              identityNumber: "00000000000",
              lastLoginDate: "2022-05-04 20:14: 35",
              registarionDate: "2022-01-04 19:14: 35",
              registrationAddress: "Nidakule göztepe Merdivenköy mah Bora sokak no : 1",
              ip: "85.34.78.112",
              city: "Istanbul",
              country: "Turkey",
              zipCode: "34732",
            },
            shippingAddress: {
              contactName: "John Doe",
              city: "Istanbul",
              country: "Turkey",
              address: "Nidakule göztepe, Merdivenköy mah Bora sokak no : 1",
              zipCode: "34732",
            },
        
            billingAddress: {
              contactName: "John Doe",
              city: "Istanbul",
              country: "Turkey",
              address: "Nidakule göztepe, merdivenköy mah Bora sok no : 1",
            },
        
            basketItems: [
              {
                id: "BT101",
                name: "İphone 12 Pro",
                category1: "Telefonlar",
                category1: "İOS Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: 90,
              },
              {
                id: "BT102",
                name: "İphone 13 mini",
                category1: "Telefonlar",
                category1: "İOS Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: 150,
              },
        
              {
                id: "BT103",
                name: "İphone 8 Plus",
                category1: "Telefonlar",
                category1: "İOS Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: 60,
              },
            ],
          }
      ).then((result)=>{
          console.log(result);
          Logs.logFile('12- Checkout Form ödeme test',result)
      }).catch((err)=>{
          console.log(err)
          Logs.logFile('12- Checkout Form ödeme test - HATA',err)
      })
  }

//initializeCheckoutForm();


const getFormPayment = () => {
    Checkouts.getFormPayment({
        locale : Iyzipay.LOCALE.TR,
        conversationId : nanoid(),
        token : 'bdc51cfa-2141-45c1-b54e-9428e9db11ea',
    })
    .then((result)=> {
        console.log(result);
        Logs.logFile('13- Checkout form ödeme detayları',result)
    })
    .catch((err)=> {
        console.log(err);
        Logs.logFile('13- Checkout form ödeme detayları -Hata',err)
    })
}

//getFormPayment();

const cancelPayment = () =>{
    CancelPayment.cancelPayment({

        locale : Iyzipay.LOCALE.TR,
        conversationId : nanoid(),
        paymentId : '17516513',
        ip: '85.34.78.112',
        reason : Iyzipay.REFUND_REASON.BUYER_REQUEST,
        description : 'Kullanıcı isteği ile iptal edildi.'

    })
    .then((result)=>{
        console.log(result);
        Logs.logFile('14- Ödeme iptali',result)
    })
    .catch((err)=>{
        console.log(err);
        Logs.logFile('14- Ödeme iptali -Hata',err);
    })
}

//cancelPayment();


const cancelPaymentRefundReason = () =>{
    CancelPayment.cancelPayment({

        locale : Iyzipay.LOCALE.TR,
        conversationId : nanoid(),
        paymentId : '17505032',
        ip: '85.34.78.112',
        reason : Iyzipay.REFUND_REASON.BUYER_REQUEST,
        description : 'Kullanıcı isteği ile iptal edildi.'

    })
    .then((result)=>{
        console.log(result);
        Logs.logFile('15- Kullanıcı isteği ile Ödeme iptali',result)
    })
    .catch((err)=>{
        console.log(err);
        Logs.logFile('15- Kullanıcı isteği ile Ödeme iptali -Hata',err);
    })
}

//cancelPaymentRefundReason();


const refundPayment = () => {
    return RefundPayment.refundPayment({
         locale : Iyzipay.LOCALE.TR,
         conversationId : nanoid(),
         paymentTransactionId : '18715826',
         ip : '85.34.78.112',
         price : '50',
         currency : Iyzipay.CURRENCY.TRY,

    })
    .then((result)=>{
        console.log(result);
        Logs.logFile('16- İade etme işlemi',result);

    })
    .catch((err)=>{
        console.log(err)
        Logs.logFile('16- İade etme işlemi - Hata');
    })
}
refundPayment();








