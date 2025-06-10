# EMI Calculator with Prepayment Simulator

[Try Live Demo](https://sovereignstack.github.io/emi/prepay.html)

A web-based EMI (Equated Monthly Installment) calculator that helps users calculate loan EMIs and visualize the impact of prepayments on their loan schedule.

## Features

- Calculate monthly EMI based on principal, interest rate, and tenure
- Support for both monthly and yearly tenure input
- Dynamic amortization schedule showing:
  - Monthly EMI breakdown (Principal and Interest components)
  - Remaining loan balance
  - Prepayment options for each installment
- Real-time recalculation with prepayment inputs
- Total payment and interest paid calculations
- Maximum prepayment limit enforcement

## Usage

1. Enter the loan details:
   - Principal amount
   - Annual interest rate (%)
   - Loan tenure (in months or years)

2. The calculator will instantly show:
   - Monthly EMI amount
   - Total payment over loan tenure
   - Total interest to be paid

3. To simulate prepayments:
   - Enter prepayment amounts in the respective month's input field
   - The schedule automatically adjusts to show the impact
   - Maximum allowable prepayment is enforced for each installment

## Technical Details

- Built with pure HTML, CSS, and JavaScript
- No external dependencies required
- Reactive design
- Client-side calculations for instant results
