
export default class CheckList{
    constructor(selector) {
        if(!selector){
            throw new Error('No selector provide')
        }
        this.$element = $(selector)
        if(this.$element.length === 0){
            throw new Error('Could not find element with selector: ' + selector)
        }
    }

    addRow(order){
        this.removeRow(order.email)
        let rowElement = new Row(order)
        this.$element.append(rowElement.$element)
    }

    removeRow(email){
        this.$element
            .find('[value="' + email + '"]')
            .closest('[rel="js-order-checkbox"]')
            .remove();
    }

    addClickHandler(fn){
        // or function(event){...}.bind(this)
        this.$element.on('click', 'input', (event) => {
            // console.log(event)
            var email = event.target.value;
            fn(email).then(function(){
                this.removeRow(email)
            }.bind(this))
        })
    }
}

class Row{
    constructor(order){
        let $div = $('<div></div>', {
            'rel': 'js-order-checkbox',
            'class': 'checkbox'
        })
        let $label = $('<label></label>')
        let $checkbox = $('<input></input>', {
            type: 'checkbox',
            value: order.email
        })

        let description = order.size + ' ';
        if(order.flavor)
            description += order.flavor + ' ';
        description += order.coffee + ' ';
        description += '[' + order.strength + 'x] ';
        description += 'for ' + order.email;

        $label.append($checkbox)
        $label.append(description)
        $div.append($label)

        this.$element = $div
    }
}