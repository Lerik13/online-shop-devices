module.exports = class UserDto {
	email;
	id;
	role;
	isActivated;
	qtyInBasket = 0;

	constructor(model) {
		this.email = model.email;
		this.id = model.id;
		this.role = model.role;
		this.isActivated = model.isActivated;
	}

	setQtyInBasket(qty) {
		if (!qty) {
			this.qtyInBasket = 0
		}
		this.qtyInBasket = Number(qty)
	}

	get qtyInBasket() {
		return this.qtyInBasket
	}

}