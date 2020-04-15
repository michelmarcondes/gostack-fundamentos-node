import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];

    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.reducer('income');
    const outcome = this.reducer('outcome');
    const total = income - outcome;

    this.balance = {
      income,
      outcome,
      total,
    };

    return this.balance;
  }

  private reducer(type: string): number {
    const initialValue = 0;
    return this.transactions.reduce((accumulator, currentValue) => {
      if (currentValue.type === type) {
        return accumulator + currentValue.value;
      }
      return accumulator;
    }, initialValue);
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    const { total } = this.getBalance();

    if (transaction.type === 'outcome' && total - transaction.value < 0) {
      throw Error('Not enough money.');
    }

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
