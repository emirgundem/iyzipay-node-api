import Iyzipay from "iyzipay"
import * as Cards from "./methods/cards.js"
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
readCardOfUser();


//createUserAndCards();
//createCardForUser();

