# 01knapsack-problem

- [01knapsack-problem](#01knapsack-problem)
    * [Intro](#intro)
    * [Solution](#solution)
        + [Problem details](#problem-details)
        + [Solution](#solution-1)
            - [Step 1:](#step-1-)
            - [Step 2:](#step-2-)
            - [Step 3 (the crux of the problem):](#step-3--the-crux-of-the-problem--)
            - [Step 4 (final solution):](#step-4--final-solution--)
        + [Time complexity](#time-complexity)
    * [Structure of the code](#structure-of-the-code)
    * [How to use](#how-to-use)
    * [Development](#development)
        + [Hot Reload](#hot-reload)
        + [Test and Coverage](#test-and-coverage)
        + [Built With](#built-with)
    * [License](#license)

## Intro

The knapsack problem is a problem in combinatorial optimization:
Given a set of items, each with a weight and a value, determine the number of each item to include in a collection so
that the total weight is less than or equal to a given limit and the total value is as large as possible. It derives its
name from the problem faced by someone who is constrained by a fixed-size knapsack and must fill it with the most
valuable items. The problem often arises in resource allocation where the decision makers have to choose from a set of
non-divisible projects or tasks under a fixed budget or time constraint, respectively.

The knapsack problem has been studied for more than a century, with early works dating as far back as 1897. The name "
knapsack problem" dates back to the early works of the mathematician Tobias Dantzig (1884–1956), and refers to the
commonplace problem of packing the most valuable or useful items without overloading the luggage.

## Solution

We’ll be solving this problem with dynamic programming. Dynamic programming requires an optimal substructure and
overlapping sub-problems, both of which are present in the 0–1 knapsack problem, as we shall see.

### Problem details

Suppose we have a knapsack which can hold int w = 10 weight units. We have a total of int n = 4 items to choose from,
whose values are represented by an array int[] val = {10, 40, 30, 50} and weights represented by an array int[] wt = {5,
4, 6, 3}. Since this is the 0–1 knapsack problem, we can either include an item in our knapsack or exclude it, but not
include a fraction of it, or include it multiple times.

### Solution

#### Step 1:

First, we create a 2-dimensional array (i.e. a table) of n + 1 rows and w + 1 columns. A row number i represents the set
of all the items from rows 1— i. For instance, the values in row 3 assumes that we only have items 1, 2, and 3. A column
number j represents the weight capacity of our knapsack. Therefore, the values in column 5, for example, assumes that
our knapsack can hold 5 weight units. Putting everything together, an entry in row i, column j represents the maximum
value that can be obtained with items 1, 2, 3 … i, in a knapsack that can hold j weight units. Let’s call our table mat
for matrix. Therefore, int[][] mat = new int[n + 1][w + 1].

#### Step 2:

We can immediately begin filling some entries in our table: the base cases, for which the solution is trivial. For
instance, at row 0, when we have no items to pick from, the maximum value that can be stored in any knapsack must be 0.
Similarly, at column 0, for a knapsack which can hold 0 weight units, the maximum value that can be stored in it is 0. (
We’re assuming that there are no massless, valuable items.)

#### Step 3 (the crux of the problem):

Now, we want to begin populating our table. As with all dynamic programming solutions, at each step, we will make use of
our solutions to previous sub-problems. I’ll first describe the logic, before showing a concrete example. The
relationship between the value at row i, column j and the values to the previous sub-problems is as follows:
Recall that at row i and column j, we are tackling a sub-problem consisting of items 1, 2, 3 … i with a knapsack of j
capacity. There are 2 options at this point: we can either include item i or not. Therefore, we need to compare the
maximum value that we can obtain with and without item i. The maximum value that we can obtain without item i can be
found at row i-1, column j. This part’s easy. The reasoning is straightforward: whatever maximum value we can obtain
with items 1, 2, 3 … i must obviously be the same maximum value we can obtain with items 1, 2, 3 … i - 1, if we choose
not to include item i. To calculate the maximum value that we can obtain with item i, we first need to compare the
weight of item i with the knapsack’s weight capacity. Obviously, if item i weighs more than what the knapsack can hold,
we can’t include it, so it does not make sense to perform the calculation. In that case, the solution to this problem is
simply the maximum value that we can obtain without item i (i.e. the value in the row above, at the same column).
However, suppose that item i weighs less than the knapsack’s capacity. We thus have the option to include it, if it
potentially increases the maximum obtainable value. The maximum obtainable value by including item i is thus = the value
of item i itself + the maximum value that can be obtained with the remaining capacity of the knapsack. We obviously want
to make full use of the capacity of our knapsack, and not let any remaining capacity go to waste. Therefore, at row i
and column j (which represents the maximum value we can obtain there), we would pick either the maximum value that we
can obtain without item i, or the maximum value that we can obtain with item i, whichever is larger.

At row 3 (item 2), and column 5 (knapsack capacity of 4), we can choose to either include item 2 (which weighs 4 units)
or not. If we choose not to include it, the maximum value we can obtain is the same as if we only have item 1 to choose
from (which is found in the row above, i.e. 0). If we want to include item 2, the maximum value we can obtain with item
2 is the value of item 2 (40) + the maximum value we can obtain with the remaining capacity (which is 0, because the
knapsack is completely full already). At row 3 (item 2), and column 10 (knapsack capacity of 9), again, we can choose to
either include item 2 or not. If we choose not to, the maximum value we can obtain is the same as that in the row above
at the same column, i.e. 10 (by including only item 1, which has a value of 10). If we include item 2, we have a
remaining knapsack capacity of 9 - 4 = 5. We can find out the maximum value that can be obtained with a capacity of 5 by
looking at the row above, at column 5. Thus, the maximum value we can obtain by including item 2 is 40 (the value of
item 2) + 10 = 50. We pick the larger of 50 vs 10, and so the maximum value we can obtain with items 1 and 2, with a
knapsack capacity of 9, is 50.

#### Step 4 (final solution):

Once the table has been populated, the final solution can be found at the last row in the last column, which represents
the maximum value obtainable with all the items and the full capacity of the knapsack. return mat[n][w];

### Time complexity

Time complexity of 0 1 Knapsack problem is O(nW) where, n is the number of items and W is the capacity of knapsack.

## Structure of the code

![structure of the code](https://i.imgur.com/01FS45S.png)
We've developed Pack class regarding solving the above problem. This class provides a static method (pack method) which
take the absolute address of input file. Input file should be placed in "files" directory (in the root of project). The
output of pack method is a string which contains the best solutions.

for example if you put this content in the ./files/example_input:

```
81 : (1,53.38,€45) (2,88.62,€98) (3,78.48,€3) (4,72.30,€76) (5,30.18,€9) (6,46.34,€48)
8 : (1,15.3,€34)
75 : (1,85.31,€29) (2,14.55,€74) (3,3.98,€16) (4,26.24,€55) (5,63.69,€52) (6,76.25,€75) (7,60.02,€74) (8,93.18,€35) (9,89.95,€78)
56 : (1,90.72,€13) (2,33.80,€40) (3,43.15,€10) (4,37.97,€16) (5,46.81,€36) (6,48.77,€79) (7,81.80,€45) (8,19.36,€79) (9,6.76,€64)
```

you will get below solutions in the ./files/example_output:

```
4
-
7,2
8,9
```

## How to use

At the first step you should install all packages, so run this command:

```npm run install```

Then put your input-file into the "files" directory. We assume that the name of file is "example_input"; 
If you want to change the file directory, you can specify the address of that in .env file

```mv .env.example .env```

We use typescript in this project, so lets build it using:

```npm run build```

For the last step run the project:

```npm run start```

You can find output file in "./file" directory. Based on our above idea, output file will be "example_output".

## Development

### Hot Reload

For development purpose use the below command to build and run at same time:

```npm run start:dev```

### Test and Coverage

We use jest framework for providing unit tests. All tests are exist under "tests" directory.

We can run all unit tests by this command:

```npm run test```

In order to be aware of code-coverage we can use:

```npm run test:coverage```

then pay attention to the "./coverage/lcov-report/index.html" file. 


### Built With

* [NodeJS](https://nodejs.org/en/) - A JavaScript runtime built on Chrome's V8 JavaScript engine
* [Typescript](https://www.typescriptlang.org/) - Typed JavaScript at Any Scale
  &nbsp;

## License
This project is licensed under the Apache License - see the [LICENSE.md](LICENSE.md) file for details
&nbsp;
