document.addEventListener('DOMContentLoaded', () => {
  const num1 = document.getElementById('num1');
  const num2 = document.getElementById('num2');
  const result = document.getElementById('result');
  const form = document.getElementById('addForm');
  const addBtn = document.getElementById('addBtn');
  const clearBtn = document.getElementById('clearBtn');

  const validateInputs = () => {
    const val1 = num1.value.trim();
    const val2 = num2.value.trim();
    const isValid1 = val1 !== '' && !isNaN(val1);
    const isValid2 = val2 !== '' && !isNaN(val2);

    num1.classList.toggle('is-invalid', !isValid1);
    num2.classList.toggle('is-invalid', !isValid2);

    return isValid1 && isValid2;
  };

  const updateButtonState = () => {
    addBtn.disabled = !validateInputs();
  };

  [num1, num2].forEach(input => {
    input.addEventListener('input', () => {
      validateInputs();
      updateButtonState();
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateInputs()) {
      const sum = parseFloat(num1.value) + parseFloat(num2.value);
      result.textContent = sum.toLocaleString();
      result.classList.add('animate-result');
      setTimeout(() => result.classList.remove('animate-result'), 300);
    } else {
      result.textContent = '';
    }
  });

  clearBtn.addEventListener('click', () => {
    num1.value = '';
    num2.value = '';
    result.textContent = '';
    num1.classList.remove('is-invalid');
    num2.classList.remove('is-invalid');
    updateButtonState();
    num1.focus();
  });

  updateButtonState(); 
});
