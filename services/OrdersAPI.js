import Order from "../models/order"

export const fetchUserOrders = async (userId) => {
  const response = await fetch(`https://react-native-practice-ac60f.firebaseio.com/orders/${userId}.json`)
  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }

  const data = await response.json()
  return Object.keys(data).map(productId => {
    const orderBody = data[productId]
    return new Order(productId, orderBody.products, orderBody.totalCost, new Date(orderBody.date))
  })
}

export const addOrder = async (userId, token, date, products, totalCost) => {
  const response = await fetch(`https://react-native-practice-ac60f.firebaseio.com/orders/${userId}.json?auth=${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      date,
      totalCost,
      products,
    })
  })

  if (!response.ok) {
    console.log(response)
    throw new Error("Something went wrong")
  }

  const data = await response.json()
  return new Order(data.name, products, totalCost, date)
}