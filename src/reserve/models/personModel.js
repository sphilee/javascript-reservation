export default {
    data : {
        name: null,
        phone: null,
        email: null,
        agreement: false
    },

    isValid() {
        return this.data.name && this.data.phone && this.data.agreement;
    },

    setName(name){
        this.data.name = name;
        return this;
    },

    setPhone(number){
        this.data.phone = number;
        return this;
    },

    setEmail(email){
        this.data.email = email;
        return this;
    },

    setAgreement(agreement){
        this.data.agreement = agreement;
        return this;
    }
};