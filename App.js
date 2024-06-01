import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomNumbers = () => {
  let nums = [];
  for (let i = 0; i < 4; i++) {
    nums.push(getRandomInt(1, 99));
  }
  return nums;
};
// 
const generateTargetValue = (numbers, setGeneratedExpression) => {
  const operators = ['+', '-', '*', '/'];
  let expression = `${numbers[0]}`;
  for (let i = 1; i < numbers.length; i++) {
    const randomOperator = operators[getRandomInt(0, operators.length - 1)];
    expression += ` ${randomOperator} ${numbers[i]}`;
  }
  setGeneratedExpression(expression);
  try {
    // eval tính ra biểu thức 
    const result = eval(expression);
    return Number.isInteger(result) ? result : result.toFixed(2);
  } catch (error) {
    return 0; // Fallback target value if there's an error in the expression
  }
};

const countNumbersInExpression = (expression) => {
  return (expression.match(/\d+/g) || []).length;
};

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const App = () => {
  // 1 tạo ra numbers gồm 4 số
  const [numbers, setNumbers] = useState(generateRandomNumbers());
  //2 lưu trữ trạng thái của biêu thức
  const [expression, setExpression] = useState('');
  // 3 
  const [usedNumbers, setUsedNumbers] = useState({});
  const [userValue, setUserValue] = useState(0);
  const [times, setTimes] = useState(3);
  const [targetValue, setTargetValue] = useState(0);
  const [generatedExpression, setGeneratedExpression] = useState('');
  const [shuffledNumbers, setShuffledNumbers] = useState([]);

  useEffect(() => {
    setTargetValue(generateTargetValue(numbers, setGeneratedExpression));
    setShuffledNumbers(shuffleArray([...numbers]));
  }, [numbers]);

  const addToExpression = (value, type) => {
    // số lần number xuất hiện 
    if (type === 'number' && usedNumbers[value] && usedNumbers[value] >= (numbers.filter(num => num === value).length)) return;
    setExpression(expression + value);
    if (type === 'number') {
      setUsedNumbers({
        ...usedNumbers,
        [value]: (usedNumbers[value] || 0) + 1
      });
    }
  };

  const resetGame = () => {
    setExpression('');
    setUsedNumbers({});
    setUserValue(0);
  };
  const newGame = () => {
    const newNumbers = generateRandomNumbers();
    setNumbers(newNumbers);
    setExpression('');
    setUsedNumbers({});
    setUserValue(0);
    setTimes(3);
    setTargetValue(generateTargetValue(newNumbers, setGeneratedExpression));
    setShuffledNumbers(shuffleArray([...newNumbers]));
  };

  const tryAgain = () => {
    setExpression('');
    setUsedNumbers({});
    setTimes(times - 1);
  };

  const checkExpression = () => {
    try {
      const result = eval(expression);

      const formattedResult = Number.isInteger(result) ? result : result.toFixed(2);
      setUserValue(formattedResult);
      if (formattedResult === targetValue) {
        Alert.alert('Congratulations', 'You won the game!', [
          { text: 'New Game', onPress: newGame }
        ]);
      } else {
        if (times > 1) {
          Alert.alert('Incorrect', 'Your expression is incorrect. Tap the button to try again.', [
            { text: 'Retry', onPress: tryAgain }
          ]);
        } else {
          Alert.alert('Game Over', [
            { text: 'OK', onPress: resetGame }
          ]);
        }
      }
    } catch (error) {
      Alert.alert('Invalid Expression', 'Please create Valid Expression');
    }
  };

  const canCheckExpression = countNumbersInExpression(expression) === 4;

  return (
    <View style={styles.container}>
      <Text style={styles.nameOfGame}>EXPRESSION GAME</Text>
      <View style={styles.area1}>
        <View style={styles.values}>
          <View style={styles.valueContainer}>
            <Text style={styles.textValueText}>Your Value:</Text>
            <Text style={styles.valueText}>{userValue}</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.textValueText}>Target Value:</Text>
            <Text style={styles.valueText}>{targetValue}</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.textValueText}>Times:</Text>
            <Text style={styles.valueText}>{times}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.expression}>{expression}</Text>
      <View style={styles.row}>
        {shuffledNumbers.map((num, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, usedNumbers[num] && usedNumbers[num] >= (numbers.filter(number => number === num).length) && styles.disabledButton]}
            onPress={() => addToExpression(num, 'number')}
            disabled={usedNumbers[num] && usedNumbers[num] >= (numbers.filter(number => number === num).length)}
          >
            <Text style={styles.buttonText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        {['+', '-', '*', '/'].map((operator, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => addToExpression(operator, 'operator')}
          >
            <Text style={styles.buttonText}>{operator}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.actionButton} onPress={resetGame}>
          <Text style={styles.actionButtonText}>Reset</Text>
        </TouchableOpacity>
        {times > 0 && (
          <TouchableOpacity
            style={[styles.actionButton, !canCheckExpression && styles.disabledActionButton]}
            onPress={checkExpression}
            disabled={!canCheckExpression}
          >
            <Text style={styles.actionButtonText}>Check</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.generatedExpressionText}>Hint : {generatedExpression}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#7ab1c8',
  },
  nameOfGame: {
    color: '#792527',
    fontSize: 28,
    fontWeight: 5,
    marginBottom: 20,
  },
  values: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  valueContainer: {
    flexDirection: 'column',
  },
  textValueText: {
    color: '#792527',
  },
  valueText: {
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#b8b6b6',
    color: '#792527',
  },

  expression: {
    fontSize: 24,
    marginBottom: 24,
    backgroundColor: '#b8b6b6',
    paddingHorizontal: 80,
    paddingVertical: 12,
    color: '#792527',
  },
  times: {
    fontSize: 24,
    marginBottom: 24,
    backgroundColor: '#b8b6b6',
    paddingHorizontal: 18,
    paddingVertical: 6,
    color: '#792527',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  button: {
    margin: 4,
    padding: 16,
    backgroundColor: '#007BFF',
    borderRadius: 4,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  actionButton: {
    margin: 4,
    padding: 16,
    backgroundColor: '#973540',
    borderRadius: 4,
  },
  disabledActionButton: {
    backgroundColor: '#ccc',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  generatedExpressionText: {
    marginTop: 20,
    fontSize: 18,
    color: '#792527',
  },
});

export default App;
