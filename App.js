import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Alert, TouchableOpacity } from 'react-native';

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

const generateTargetValue = (numbers) => {
  const operators = ['+', '-', '*', '/'];
  let expression = `${numbers[0]}`;
  for (let i = 1; i < numbers.length; i++) {
    const randomOperator = operators[getRandomInt(0, operators.length - 1)];
    expression += ` ${randomOperator} ${numbers[i]}`;
  }
  try {
    return Math.floor(eval(expression));
  } catch (error) {
    return 24; // Fallback target value if there's an error in the expression
  }
};

const countNumbersInExpression = (expression) => {
  return (expression.match(/\d+/g) || []).length;
};

const App = () => {
  const [numbers, setNumbers] = useState(generateRandomNumbers());
  const [expression, setExpression] = useState('');
  const [usedNumbers, setUsedNumbers] = useState(new Set());
  const [userValue, setUserValue] = useState(0);
  const [times, setTimes] = useState(3);
  const [targetValue, setTargetValue] = useState(generateTargetValue(numbers));

  useEffect(() => {
    setTargetValue(generateTargetValue(numbers));
  }, [numbers]);

  const addToExpression = (value, type) => {
    if (type === 'number' && usedNumbers.has(value)) return;
    setExpression(expression + value);
    if (type === 'number') {
      setUsedNumbers(new Set([...usedNumbers, value]));
    }
  };

  const resetGame = () => {
    const newNumbers = generateRandomNumbers();
    setNumbers(newNumbers);
    setExpression('');
    setUsedNumbers(new Set());
    setUserValue(0);
    setTimes(3);
    setTargetValue(generateTargetValue(newNumbers));
  };

  const tryAgain = () => {
    setExpression('');
    setUsedNumbers(new Set());
    setTimes(times - 1);
  };

  const checkExpression = () => {
    try {
      const result = eval(expression);
      print(typeof (result))
      setUserValue(result);
      if (result === targetValue) {
        Alert.alert('Congratulations', 'You won the game!', [
          { text: 'OK', onPress: () => { } }
        ]);
      } else {
        if (times > 1) {
          Alert.alert('Incorrect', 'Không đúng, vui lòng thử lại.', [
            { text: 'OK', onPress: tryAgain }
          ]);
        } else {
          Alert.alert('Game Over', 'Bạn đã hết lượt chơi.', [
            { text: 'OK', onPress: resetGame }
          ]);
        }
      }
    } catch (error) {
      Alert.alert('Invalid Expression', 'Vui lòng tạo biểu thức hợp lệ.');
    }
  };

  const canCheckExpression = countNumbersInExpression(expression) === 4;

  return (
    <View style={styles.container}>
      <Text style={styles.times}>{times}</Text>
      <View style={styles.area1}>
        <View style={styles.values}>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>Your Value:</Text>
            <Text style={styles.valueText}>{userValue}</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>Target Value:</Text>
            <Text style={styles.valueText}>{targetValue}</Text>
          </View>
        </View>

      </View>

      <Text style={styles.expression}>{expression}</Text>
      <View style={styles.row}>
        {numbers.map((num, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, usedNumbers.has(num) && styles.disabledButton]}
            onPress={() => addToExpression(num, 'number')}
            disabled={usedNumbers.has(num)}
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
  values: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  valueContainer: {
    flexDirection: 'row',
  },
  valueText: {
    fontSize: 20,
    paddingHorizontal: 10,
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
});

export default App;