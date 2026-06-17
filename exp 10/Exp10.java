class BankAccount {

    private int accountNumber;
    private String accountHolderName;
    protected double balance;

    public BankAccount(
            int accountNumber,
            String accountHolderName,
            double balance) {

        this.accountNumber = accountNumber;
        this.accountHolderName = accountHolderName;
        this.balance = balance;
    }

    public int getAccountNumber() {
        return accountNumber;
    }

    public String getAccountHolderName() {
        return accountHolderName;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        balance += amount;
        System.out.println(
                "Amount Deposited: ₹" + amount);
    }

    public void displayDetails() {
        System.out.println(
                "Account Number: "
                        + accountNumber);

        System.out.println(
                "Account Holder Name: "
                        + accountHolderName);

        System.out.println(
                "Balance: ₹"
                        + balance);
    }

    public void calculateInterest() {
    }
}

class SavingsAccount
        extends BankAccount {

    public SavingsAccount(
            int accountNumber,
            String accountHolderName,
            double balance) {

        super(
                accountNumber,
                accountHolderName,
                balance);
    }

    @Override
    public void calculateInterest() {

        double interest =
                balance * 0.05;

        System.out.println(
                "Savings Account Interest: ₹"
                        + interest);
    }
}

class CurrentAccount
        extends BankAccount {

    public CurrentAccount(
            int accountNumber,
            String accountHolderName,
            double balance) {

        super(
                accountNumber,
                accountHolderName,
                balance);
    }

    @Override
    public void calculateInterest() {

        double interest =
                balance * 0.02;

        System.out.println(
                "Current Account Interest: ₹"
                        + interest);
    }
}

public class Exp10 {

    public static void main(
            String[] args) {

        SavingsAccount s =
                new SavingsAccount(
                        101,
                        "Rahul Sharma",
                        50000);

        CurrentAccount c =
                new CurrentAccount(
                        102,
                        "Anita Verma",
                        30000);

        System.out.println(
                "Savings Account");

        s.deposit(5000);
        s.displayDetails();
        s.calculateInterest();

        System.out.println();

        System.out.println(
                "Current Account");

        c.deposit(3000);
        c.displayDetails();
        c.calculateInterest();
    }
}