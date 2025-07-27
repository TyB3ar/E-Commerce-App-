// Order Type, include ID for order, total price, date of creation
// should also include reference to user, details of products ordered 
// (name, price, id, quantity), and order timestamp

export interface Order {
    id: string;
    userId: string;
    products: {
        productId: string;
        quantity: number;
        price: number;
    }[];
    totalPrice: number;
    createdAt: Date;
}