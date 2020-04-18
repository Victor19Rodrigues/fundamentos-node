import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeTotal = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce(
        (previousValue, currentValue) => previousValue + currentValue.value,
        0,
      );

    const outcomeTotal = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce(
        (previousValue, currentValue) => previousValue + currentValue.value,
        0,
      );

    const balance = {
      income: incomeTotal,
      outcome: outcomeTotal,
      total: incomeTotal - outcomeTotal,
    };

    return balance;
  }

  public create({ type, value, title }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ type, value, title });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
