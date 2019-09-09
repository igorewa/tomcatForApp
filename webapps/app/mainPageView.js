function getUsers() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/app/user/user_list', false);
    xhr.send();
    var json = JSON.parse(xhr.response.toString());
    return json;
}

function setUsersList() {
    var users = getUsers();
    var list = document.getElementById('select');
    var item = document.createElement('option');
    for (var i = 0; i < users.length; i++) {
        item.innerHTML = users[i].name;
        item.setAttribute('value', users[i].id);
        list.appendChild(item.cloneNode(true));
    }
}

var userData = {};

function getUserInfo(id) {
    var users = getUsers();
    for (var i = 0; i <= users; i++) {
        if (id === users[i].id) {
            id = users[i].id;
        }
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/app/user/user_info/' + id, false);
    xhr.send();
    var user = JSON.parse(xhr.response.toString());
    showUserData(user);
    userData = user;
}

function showUserData(user, userData) {
    var itemName = document.getElementById('name');
    itemName.innerHTML = 'Имя: ' + user.name;
    var itemAddress = document.getElementById('address');
    itemAddress.innerHTML = 'Адрес: ' + user.country + ', ' + user.post_index + ', ' + user.city + ', ' + user.street + ', ' + user.house;
    var itemPhone = document.getElementById('phone');
    itemPhone.innerHTML = 'Телефон: ' + user.phone;
    var itemWorkPlace = document.getElementById('workPlace');
    itemWorkPlace.innerHTML = 'Место работы: ' + user.company_name;
    var itemRole = document.getElementById('role');
    itemRole.innerHTML = 'Должность: ' + user.role;
    var editButton = document.getElementById('editButton');
    editButton.innerHTML = '<button onclick="editUserInfo(userData)">Редактировать</button>';
    var deleteButton = document.getElementById('deleteButton');
    deleteButton.innerHTML = '<button onclick="deleteUser(' + user.id + ')">Удалить</button>';
}

function editUserInfo(userData) {
    var editForm = document.getElementById('editForm');
    editForm.innerHTML = '<form><br>' +
        'Имя: <input id="editedName" value =" '+ userData.name +' "><br>' +
        'Страна: <input id="editedCountry" value =" '+ userData.country +' "><br>' +
        'Индекс: <input id="editedIndex" value =" '+ userData.post_index +' "><br>' +
        'Город: <input id="editedCity" value =" '+ userData.city +' "><br>' +
        'Улица: <input id="editedStreet" value =" '+ userData.street + ' "><br>' +
        'Дом: <input id="editedHouse" value =" '+ userData.house +' "><br>' +
        'Телефон: <input id="editedPhone" value =" '+ userData.phone +' "><br>' +
        'Место работы: <input id="editedWorkPlace" value =" '+ userData.company_name +' "><br>' +
        'Должность: <input id ="editedRole" value =" '+ userData.role +' "><br>' +
        ' <input id="submit" type="submit" value="Отправить" onclick="sendEditedUserInfo(' + userData.id + ')">' +
        '</form>';

}

function sendEditedUserInfo(id) {
    var editedData = {};
    editedData.userId = id;
    editedData.name = document.getElementById("editedName").value;
    editedData.country = document.getElementById("editedCountry").value;
    editedData.post_index = document.getElementById("editedIndex").value;
    editedData.city = document.getElementById("editedCity").value;
    editedData.street = document.getElementById("editedStreet").value;
    editedData.house = document.getElementById("editedHouse").value;
    editedData.phone = document.getElementById("editedPhone").value;
    editedData.workPlace = document.getElementById("editedWorkPlace").value;
    editedData.role = document.getElementById("editedRole").value;
    var json = JSON.stringify(editedData);
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', '/app/user/update_user/', true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.send(json);
    xhr.onload = function () {
    	var result = JSON.parse(xhr.responseText);
       	if (xhr.readyState == 4 && xhr.status == "200") {
       	    alert("Данные изменены");
       		console.table(result);
       	} else {
       	    alert("Ошибка");
       		console.error(result);
       	}
       }
}

function addUser() {
    var addingForm = document.getElementById('newUserForm');
    addingForm.innerHTML = '<form><br>' +
        'Имя: <input id="newName"><br>' +
        'Страна: <input id="newCountry"><br>' +
        'Индекс: <input id="newIndex"><br>' +
        'Город: <input id="newCity"><br>' +
        'Улица: <input id="newStreet"><br>' +
        'Дом: <input id="newHouse"><br>' +
        'Телефон: <input id="newPhone"><br>' +
        'Место работы: <input id="newWorkPlace"><br>' +
        'Должность: <input id ="newRole"><br>' +
        ' <input id="submit" type="submit" value="Создать" onclick="sendNewUser()">' +
        '</form>';
}

function sendNewUser() {
    var newData = {};
    newData.newName = document.getElementById("newName").value;
    newData.newCountry = document.getElementById("newCountry").value;
    newData.newIndex = document.getElementById("newIndex").value;
    newData.newCity = document.getElementById("newCity").value;
    newData.newStreet = document.getElementById("newStreet").value;
    newData.newHouse = document.getElementById("newHouse").value;
    newData.newPhone = document.getElementById("newPhone").value;
    newData.newWorkPlace = document.getElementById("newWorkPlace").value;
    newData.newRole = document.getElementById("newRole").value;
    var json = JSON.stringify(newData);
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', '/app/user/add_user/', true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.send(json);
    xhr.onload = function () {
    	var result = JSON.parse(xhr.responseText);
       	if (xhr.readyState == 4 && xhr.status == "200") {
       	    alert("Пользователь добавлен");
       		console.table(result);
       	} else {
       	    alert("Ошибка");
       		console.error(result);
       	}
       }
}

function deleteUser(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/app/user/delete_user/' + id, false);
    xhr.send();
    if (xhr.status === 200) {
        alert('Пользователь удалён')
    } else {
        alert('Произошла ошибка удаления');
    }
    location.reload()
}