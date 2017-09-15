let funcionario = {email: 'abc@abc.com'};

let f = new Proxy(funcionario, {
    get(target, prop, receiver){
        console.log(`Armadilha em "${prop}" seu valor é:`);        
        return `**${Reflect.get(target, prop)}**`;
    },

    set(target, prop, value, receiver){
        console.log(`Antes: ${target[prop]} depois: ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
})

f.email = "123@qasw.com"

console.log(f.email)
console.log("\n\n")

class Funcionario {
    
        constructor(email) {
            this._email = email;
        }
    
        get email() {
            return this._email;
        }
    
        set email(email) {
            this._email = email;
        }
    }

    let trabalhador = new Proxy(new Funcionario("lianker@gmail.com"), {
        get(target, prop, receiver){
            console.log("Armadilha aqui!");            
            return Reflect.get(target, prop, receiver);
        },

        set(target, prop, value, receiver){
            console.log(`a propriedade ${prop} esta sendo modificada`)
            console.log(`anterior ${target[prop]}, novo valor ${value}`)

            return Reflect.set(target, prop, value, receiver);
        }
    })

trabalhador.email = "lineker@gmail";

trabalhador.email