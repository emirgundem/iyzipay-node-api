import Iyzipay, { CURRENCY } from "iyzipay"
import * as Installments from "./methods/installments.js"
import * as Cards from "./methods/cards.js"
import * as Payments from "../iyzico/methods/payment"
import nanoid from '../../utils/nanoid.js'
import * as Logs from '../../utils/logs.js'



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
            expireYear: "2030"
        }
    }).then((result) => {
        console.log(result);
        Logs.logFile("1-cards-kullanıcı-ve-kart-olustur", result)
    }).catch((err) => {
        console.log(err)
        Logs.logFile("1-cards- kullanıcı-ve-kart-olustur-hata", err)
    })
}


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
            expireYear: "2030"
        }
    }).then((result) => {
        console.log(result);
        Logs.logFile("2-cards- bir-kullanıcıya-kart-ekle", result)
    }).catch((err) => {
        console.log(err)
        Logs.logFile("2-cards- bir-kullanıcıya-kart-ekle-hata", err)
    })
}



const readCardOfUser = () => {
    Cards.getUserCards({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        cardUserKey: "IsVS4wxwo3OhVWFYdIouWopNMtk=",

    }).then((result) => {
        console.log(result);
        Logs.logFile("3-cards- bir-kullanıcının-kartını-oku", result)
    }).catch((err) => {
        console.log(err)
        Logs.logFile("3-cards- bir-kullanıcının-kartını-oku-hata", err)
    })
}



const deleteCardOfAUser = () => {
    Cards.deleteUserCard({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        cardUserKey: "IsVS4wxwo3OhVWFYdIouWopNMtk=",
        cardToken:"J6E1VpdklhARn1hjBZQeAQBnO9w="

    }).then((result) => {
        console.log(result);
        Logs.logFile("4-cards- bir-kullanıcının-kartını-sil", result)
    }).catch((err) => {
        console.log(err)
        Logs.logFile("4-cards- bir-kullanıcının-kartını-sil-hata", err)
    })
}

//deleteCardOfAUser();
//readCardOfUser();


//createUserAndCards();
//createCardForUser();


/*******************************INSTALLMENTS*****************************************/

const checkInstallments = () => {
    return Installments.checkInstallments({
        locale : Iyzipay.LOCALE.TR,
        conversationId : nanoid(),
        binNumber:"552879",
        price:"1000",

    }).then((result)=>{
        console.log(result);
        Logs.logFile('5-installments- bir-kart-ve ücret taksitlendirme ',result);
    }).catch((err)=>{
        console.log(err)
        Logs.logFile('5-installments- bir-kart-ve-ücret-taksitlendirme-hata',err);
    })
}

//checkInstallments();


//Normal Ödeme

const createPayment = () => {
    return Payments.createPayment({

        locale : Iyzipay.LOCALE.TR,
        conversationId : nanoid(),
        price : "300",
        paidPrice : "300",
        currency : CURRENCY.TRY,
        installment:"1",
        basketId : "B4TYUSW",
        paymentChannel : Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup : Iyzipay.PAYMENT_GROUP.PRODUCT,
        paymentCard : {
            cardAlias: "Kredi Kartım",
            cardHolderName: "John Doe",
            cardNumber: "5528790000000008",
            expireMonth: "12",
            expireYear: "2030",
            cvc :'123',
            registerCard: '0'
        },
        buyer : {
            id:'SDFJKL',
            name :'John',
            surname : 'Doe',
            gsmNumber : '05385194056',
            email:'email@email.com',
            identityNumber : '00000000000',
            lastLoginDate:'2022-05-04 20:14: 35',
            registarionDate : '2022-01-04 19:14: 35',
            registrationAddress : 'Nidakule göztepe Merdivenköy mah Bora sokak no : 1',
            ip:"85.34.78.112",
            city:'Istanbul',
            country : 'Turkey',
            zipCode : '34732',
        },
        shippingAddress : {
            contactName : 'John Doe',
            city:'Istanbul',
            country:'Turkey',
            address : 'Nidakule göztepe, Merdivenköy mah Bora sokak no : 1',
            zipCode : '34732',
        },

        billingAddress: {
            contactName : 'John Doe',
            city:'Istanbul',
            country:'Turkey',
            address : 'Nidakule göztepe, merdivenköy mah Bora sok no : 1'
        },

        basketItems : [{
            id:'BT101',
            name : 'İphone 12 Pro',
            category1 : 'Telefonlar',
            category1 : 'İOS Telefonlar',
            itemType : Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
            price : 90
        },
        {
            id:'BT102',
            name : 'İphone 13 mini',
            category1 : 'Telefonlar',
            category1 : 'İOS Telefonlar',
            itemType : Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
            price : 150,
        },

        {
            id:'BT103',
            name : 'İphone 8 Plus',
            category1 : 'Telefonlar',
            category1 : 'İOS Telefonlar',
            itemType : Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
            price : 60
        }
    ]
    })

    .then((result)=>{
        console.log(result)
        Logs.logFile('6- Yeni bir kartla ödeme al ve kartı kaydetme',result)
    }).catch((err)=>{
        console.log(err)
        Logs.logFile('6- Yeni bir kartla ödeme al ve kartı kaydetme - Hata',err)
    })
}


createPayment();