export const typeDefs = `
  type Query {
    message: String
    cars: [Car]
    widgets: [Widget] 
    
  }
  
  type Mutation {
  
  appendCar(car:AppendCar):Car
  replaceCar(car:ReplaceCar):Car
  appendWidget(widget:AppendWidget):Widget
  
  }
  
  
  type Car {
      id: ID! 
      make: String
      model: String
      year: Int
      color: String
      price: Float
      
  }
  
  
  type Widget {
  
    id: ID!
    name: String
    description: String
    color: String
    size: String
    price: Int
    quantity: Int
  
  }
  
  input AppendCar {
  
      make: String
      model: String
      year: Int
      color: String
      price: Float
      
  
  }
  
  input AppendWidget {

    name: String
    description: String
    color: String
    size: String
    price: Int
    quantity: Int
      
  
  }
  
   input ReplaceCar {
      id: ID!
      make: String
      model: String
      year: Int
      color: String
      price: Float
  }
  
  
  
`;
