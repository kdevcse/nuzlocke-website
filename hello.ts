class Item {
    name: string;
    favorite: boolean = false;
    constructor(public itemName: string, public uses: number) {
        if (uses > 5) {
            this.favorite = true;
        }
    }
}

interface IPerson {
    firstName: string;
    lastName: string;
}

function greeter(person: IPerson) {
    return `Hello ${person.firstName} ${person.lastName}`;
}

function guesser(myFavObj: Item) {
    let msg = `${myFavObj.itemName} `;
    if (myFavObj.favorite) {
        msg += "seems to be one of your favorite things";
    } else {
        msg += "doesn't seem to be one of your favorite things";
    }

    return msg;
}

let user = { firstName: "Kevin", lastName: "Smith" };
console.log(greeter(user));
console.log(guesser(new Item("Baseball", 6)));
