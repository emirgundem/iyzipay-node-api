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

createUserAndCards();