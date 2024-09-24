document.addEventListener('DOMContentLoaded', () => {
    const sidebarItems = document.querySelectorAll('.sidebar .bar');
    const pages = document.querySelectorAll('.page');
  
    sidebarItems.forEach(item => {
      item.addEventListener('click', () => {

        sidebarItems.forEach(el => el.classList.remove('active'));

        item.classList.add('active');
        
        const targetId = item.getAttribute('data-target');

        pages.forEach(page => page.classList.add('hidden'));

        document.getElementById(targetId).classList.remove('hidden');
      });
    });
  });


function scrollToContent() {
  document.getElementById("content1").scrollIntoView();
}

document.addEventListener("DOMContentLoaded", function() {

  const confirmationModal = document.getElementById('confirmationModal');
  const receiptModal = document.getElementById('receiptModal');
  const warningModal = document.getElementById('warningModal');
  const bookingButton = document.getElementById('bookingButton');
  const confirmButton = document.getElementById('confirmButton');
  const cancelButton = document.getElementById('cancelButton');
  const closeReceiptButton = document.getElementById('closeReceiptButton');
  const closeWarningButton = document.getElementById('closeWarningButton');
  const downloadButton = document.getElementById('downloadButton');
  const startTimeInput = document.getElementById('start-time');
  const endTimeInput = document.getElementById('end-time');
  const dateInput = document.getElementById('date');
  const serviceButtons = document.querySelectorAll('.btn button');
  
  let selectedService = '';
  let totalPrice = 0;
  const prices = {
      racing: 35000,
      pc: 15000,
      ps5: 25000,
      xbox: 15000,
      vr: 50000
  };


  function showWarning() {
      warningModal.classList.remove('hidden');
  }


  function closeWarning() {
      warningModal.classList.add('hidden');
  }


  function showConfirmation() {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const date = document.getElementById('date').value;
      const quantity = document.getElementById('quantity').value;
      const startTime = document.getElementById('start-time').value;
      const endTime = document.getElementById('end-time').value;
      
      if (!name || !email || !phone || !date || !quantity || !startTime || !endTime || !selectedService) {
          showWarning();
          return;
      }
      
      // total
      const start = new Date(`1970-01-01T${startTime}:00`);
      const end = new Date(`1970-01-01T${endTime}:00`);
      const hours = (end - start) / (1000 * 60 * 60);
      totalPrice = hours * prices[selectedService] * quantity;

      const confirmationText = `
          Name: ${name} <br>
          Email: ${email} <br>
          Phone Number: ${phone} <br>
          Date: ${date} <br>
          People: ${quantity} <br>
          Service: ${selectedService} <br>
          Start Time: ${startTime} <br>
          End Time: ${endTime} <br>
          Total Price: Rp ${totalPrice.toLocaleString()}
      `;

      document.getElementById('confirmationText').innerHTML = confirmationText;
      confirmationModal.classList.remove('hidden');
  }


  function showReceipt() {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const date = document.getElementById('date').value;
      const quantity = document.getElementById('quantity').value;
      const startTime = document.getElementById('start-time').value;
      const endTime = document.getElementById('end-time').value;

      const receiptText = `
          Booking Success <br>
          Name: ${name} <br>
          Email: ${email} <br>
          Phone Number: ${phone} <br>
          Date: ${date} <br>
          People: ${quantity} <br>
          Service: ${selectedService} <br>
          Start Time: ${startTime} <br>
          End Time: ${endTime} <br>
          Total Price: Rp ${totalPrice.toLocaleString()} <br>
          <br> Show this to our employee in our place.
      `;

      document.getElementById('receiptText').innerHTML = receiptText;
      receiptModal.classList.remove('hidden');
  }


  bookingButton.addEventListener('click', showConfirmation);


  confirmButton.addEventListener('click', function() {
      showReceipt();
      confirmationModal.classList.add('hidden');
  });


  cancelButton.addEventListener('click', function() {
      confirmationModal.classList.add('hidden');
  });


  closeReceiptButton.addEventListener('click', function() {
      receiptModal.classList.add('hidden');
  });


  closeWarningButton.addEventListener('click', function() {
      closeWarning();
  });


  downloadButton.addEventListener('click', function() {
      const receiptText = document.getElementById('receiptText').innerHTML;
      const blob = new Blob([receiptText], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'receipt.html';
      a.click();
      URL.revokeObjectURL(url);
  });


  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  dateInput.setAttribute('min', tomorrow.toISOString().split('T')[0]);


  function setTimeRestrictions() {
      const startTime = document.getElementById('start-time');
      const endTime = document.getElementById('end-time');

      startTime.addEventListener('change', function() {
          const selectedStartTime = startTime.value;
          const startTimeHour = parseInt(selectedStartTime.split(':')[0]);

          endTime.value = '';

          if (selectedStartTime) {
              endTime.setAttribute('min', `${startTimeHour + 1}:00`);
              endTime.setAttribute('step', '3600'); // 1 hour in seconds
          }
      });

      endTime.addEventListener('change', function() {
          const selectedEndTime = endTime.value;
          const endTimeHour = parseInt(selectedEndTime.split(':')[0]);
          const startTimeHour = parseInt(startTimeInput.value.split(':')[0]);

          if (endTimeHour <= startTimeHour) {
              endTime.setCustomValidity('End time must be later than start time.');
          } else {
              endTime.setCustomValidity('');
          }
      });
  }

  setTimeRestrictions();


  serviceButtons.forEach(button => {
      button.addEventListener('click', function() {
          serviceButtons.forEach(btn => btn.classList.remove('selected'));
          this.classList.add('selected');
          selectedService = this.id;
      });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const burgerIcon = document.querySelector('.burger-icon');
  const sidebar = document.querySelector('.sidebar');

  burgerIcon.addEventListener('click', function() {
      sidebar.classList.toggle('active');
  });
});
