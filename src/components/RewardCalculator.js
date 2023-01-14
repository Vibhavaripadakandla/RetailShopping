import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './RewardCalculator.css';


const RewardCalculator = () => {
  const [transactions, setTransactions] = useState(null);
  const [customerPoints, setCustomerPoints] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/transactions');
        const data = await response.json();
        setTransactions(data.data.customers);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (transactions) {
      const calculatePoints = (amount) => {
        let points = 0;
        if (amount > 100) {
          points += 2 * (amount - 100);
        }
        if (amount > 50) {
          points += (amount - 100 > 0 ? 50 : amount - 50);
        }
        return points;
      }

      const calculateCustomerPoints = () => {
        console.log(transactions, 'data.data.customers');
        return transactions.map(customer => {
          const monthlyPoints = {};
          let totalPoints = 0;
          customer.purchases.forEach(purchase => {
            const date = moment(purchase.date).format("MMMM");
            if (!monthlyPoints[date]) {
              monthlyPoints[date] = 0;
            }
            monthlyPoints[date] += calculatePoints(purchase.amount);
            totalPoints += calculatePoints(purchase.amount);
          });
          return { name: customer.name, monthlyPoints, totalPoints };
        });
      }
      setCustomerPoints(calculateCustomerPoints());
    }
  }, [transactions]);

  if (!customerPoints) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <table id="customers">
        <tr>
          <th>Name</th>
          <th>Monthly Ponits</th>
          <th>Total Points</th>
        </tr>
        {customerPoints.map(customer => (
          <tr key={customer.name}>
            <td>{customer.name}</td>
            <td>
              <table id="monthlyPoints">
              {Object.entries(customer.monthlyPoints).map(([month, points]) => (
                  <tr key={month}>
                    <td>{month}</td>
                    <td> {points} points</td>
                  </tr>                 
                ))}
              </table>
            </td>
            <td>{customer.totalPoints}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default RewardCalculator;
