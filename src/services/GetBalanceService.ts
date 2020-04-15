import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Transactions {
  transactions: Transaction[];
  balance: Balance;
}

class GetBalanceService {
  private transactionsRepository: TransactionsRepository;

  private transactions: Transactions;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;

    this.transactions = {
      transactions: [],
      balance: { income: 0, outcome: 0, total: 0 },
    };
  }

  public execute(): Transactions {
    const transactions = this.transactionsRepository.all();

    const balance = this.transactionsRepository.getBalance();

    this.transactions = {
      transactions,
      balance,
    };

    return this.transactions;
  }
}

export default GetBalanceService;
