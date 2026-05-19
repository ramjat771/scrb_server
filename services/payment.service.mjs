// services/payment.service.mjs
import * as repo from "../repositories/payment.repo.mjs";
export const handlePayment = async ({ id, amount = 0, type }) => {
  let wallet = await repo.getByIdRepo(id);
  // 🆕 Create if not exist
  if (!wallet) {
    wallet = await repo.createRepo({
      id,
      balance: 0,
      transactions: [],
    });
  }
  let newBalance = wallet.balance;
  // 🎯 Logic
  if (type === "add") {
    newBalance += amount;
  } else if (type === "subtract") {
    if (wallet.balance < amount) {
      return { error: true, message: "Insufficient balance" };
    }
    newBalance -= amount;
  } else if (type === "update") {
    newBalance = amount;
  } else {
    return { error: true, message: "Invalid type" };
  }

  // 🧾 Transaction
  const transaction = {
    type,
    amount,
    balanceAfter: newBalance,
  };

  const updated = await repo.updateRepo(id, {
    balance: newBalance,
    $push: { transactions: transaction },
  });

  return {
    success: true,
    wallet: updated,
  };
};

// ✅ Get Balance
export const getBalance = async (id) => {
  const wallet = await repo.getByIdRepo(id);
  if (!wallet) return null;
  return {
    id: wallet.id,
    balance: wallet.balance,
  };
};

// 📜 Get History
export const getHistory = async (id) => {
  const wallet = await repo.getByIdRepo(id);
  if (!wallet) return null;

  return wallet.transactions;
};