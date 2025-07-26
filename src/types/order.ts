// Order Type, include ID for order, total price, date of creation
// should also include reference to user, details of products ordered 
// (name, price, id, quantity), and order timestamp

export interface Order {
    id: number; 
    total_price: number;
    date: Date;
}