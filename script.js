let foods=[
{id:1,name:"Chicken Biryani",category:"Main Course",price:180,quantity:20},
{id:2,name:"Veg Biryani",category:"Main Course",price:150,quantity:15},
{id:3,name:"Chicken Burger",category:"Fast Food",price:150,quantity:10},
{id:4,name:"Pizza",category:"Fast Food",price:250,quantity:12},
{id:5,name:"Ice Cream",category:"Dessert",price:80,quantity:25}
];
let customers=[
{id:1,name:"Rahul Sharma",phone:"9876543210",address:"Chennai"},
{id:2,name:"Priya Kumar",phone:"9876543211",address:"Bangalore"},
{id:3,name:"Arun Kumar",phone:"9876543212",address:"Hyderabad"}
];
let orders=[
{id:"ORD001",customerId:1,foodId:1,quantity:2,total:360,status:"COMPLETED",date:"2026-09-15"},
{id:"ORD002",customerId:2,foodId:4,quantity:1,total:250,status:"PREPARING",date:"2026-09-16"},
{id:"ORD003",customerId:3,foodId:3,quantity:2,total:300,status:"PLACED",date:"2026-09-17"}
];

document.getElementById("loginForm").addEventListener("submit",e=>{
e.preventDefault();
const u=document.getElementById("username").value.trim(),p=document.getElementById("password").value;
if(u==="admin"&&p==="admin"){document.getElementById("loginPage").classList.add("hidden");document.getElementById("app").classList.remove("hidden");initializeApplication();showToast("Login successful");}
else document.getElementById("loginError").textContent="Invalid username or password.";
});
function showForgotPassword(){alert("Demo credentials:\nUsername: admin\nPassword: admin");}
function initializeApplication(){updateDashboard();renderFoods();renderCustomers();renderOrders();loadOrderCustomers();loadOrderFoods();renderRecentOrders();renderChart();}
function showPage(id,button){
document.querySelectorAll(".page").forEach(p=>p.classList.remove("active-page"));
document.getElementById(id).classList.add("active-page");
document.querySelectorAll(".nav-item").forEach(n=>n.classList.remove("active"));
if(button)button.classList.add("active");
const titles={dashboard:["Dashboard","Welcome back, Admin"],foods:["Food Management","Manage your food items and inventory"],customers:["Customer Management","Manage your customers"],newOrder:["Place Order","Create a new customer order"],orders:["Orders","View and manage all orders"]};
document.getElementById("pageTitle").textContent=titles[id][0];document.getElementById("pageSubtitle").textContent=titles[id][1];
if(innerWidth<=800)document.getElementById("sidebar").classList.remove("open");
}
function showPageByName(id){const b=document.querySelector(`.nav-item[onclick*="'${id}'"]`);showPage(id,b)}
function toggleSidebar(){document.getElementById("sidebar").classList.toggle("open")}
function updateDashboard(){
document.getElementById("totalFoods").textContent=foods.length;
document.getElementById("totalCustomers").textContent=customers.length;
document.getElementById("totalOrders").textContent=orders.length;
const revenue=orders.filter(o=>o.status!=="CANCELLED").reduce((s,o)=>s+o.total,0);
document.getElementById("totalRevenue").textContent="₹"+revenue.toLocaleString("en-IN");
}
function renderRecentOrders(){
const t=document.getElementById("recentOrdersTable");t.innerHTML="";
orders.slice().reverse().slice(0,5).forEach(o=>{
const c=customers.find(x=>x.id===o.customerId),f=foods.find(x=>x.id===o.foodId);
t.innerHTML+=`<tr><td><strong>${o.id}</strong></td><td>${c?.name||"Unknown"}</td><td>${f?.name||"Unknown"}</td><td>${o.quantity}</td><td>₹${o.total}</td><td><span class="status status-${o.status}">${o.status}</span></td></tr>`;
});
}
function renderChart(){
const chart=document.getElementById("barChart");chart.innerHTML="";
[35,55,40,75,60,90,65].forEach((v,i)=>chart.innerHTML+=`<div class="bar-item" style="height:${v}%" title="${v} orders"><span>${["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}</span></div>`);
}
function updateChart(){renderChart();showToast("Chart updated")}
function renderFoods(){
const t=document.getElementById("foodTable");if(!t)return;
const s=(document.getElementById("foodSearch")?.value||"").toLowerCase(),cat=document.getElementById("categoryFilter")?.value||"all",sf=document.getElementById("stockFilter")?.value||"all";
const list=foods.filter(f=>{let ok=f.name.toLowerCase().includes(s)&&(cat==="all"||f.category===cat);if(sf==="in")ok=ok&&f.quantity>5;if(sf==="low")ok=ok&&f.quantity>0&&f.quantity<=5;if(sf==="out")ok=ok&&f.quantity===0;return ok});
t.innerHTML="";
list.forEach(f=>{let st=f.quantity===0?"OUT OF STOCK":f.quantity<=5?"LOW STOCK":"IN STOCK",cl=f.quantity===0?"stock-out":f.quantity<=5?"stock-low":"stock-in";
t.innerHTML+=`<tr><td>#${f.id}</td><td><strong>${f.name}</strong></td><td>${f.category}</td><td>₹${f.price}</td><td>${f.quantity}</td><td><span class="${cl}">${st}</span></td><td><button class="action-btn edit-btn" onclick="editFood(${f.id})">✎</button><button class="action-btn delete-btn" onclick="deleteFood(${f.id})">🗑</button></td></tr>`});
}
function openFoodModal(id=null){
document.getElementById("foodModal").classList.add("show");document.getElementById("foodForm").reset();document.getElementById("editFoodId").value="";document.getElementById("foodModalTitle").textContent=id?"Edit Food":"Add Food";
if(id!==null){const f=foods.find(x=>x.id===id);document.getElementById("editFoodId").value=f.id;document.getElementById("foodName").value=f.name;document.getElementById("foodCategory").value=f.category;document.getElementById("foodPrice").value=f.price;document.getElementById("foodQuantity").value=f.quantity}
}
function closeFoodModal(){document.getElementById("foodModal").classList.remove("show")}
function editFood(id){openFoodModal(id)}
document.getElementById("foodForm").addEventListener("submit",e=>{
e.preventDefault();const id=document.getElementById("editFoodId").value,n=document.getElementById("foodName").value.trim(),cat=document.getElementById("foodCategory").value,price=+document.getElementById("foodPrice").value,q=+document.getElementById("foodQuantity").value;
if(!n||!cat||price<=0||q<0)return showToast("Please enter valid food details");
if(id){const f=foods.find(x=>x.id===+id);Object.assign(f,{name:n,category:cat,price,quantity:q});showToast("Food updated successfully")}
else{foods.push({id:foods.length?Math.max(...foods.map(f=>f.id))+1:1,name:n,category:cat,price,quantity:q});showToast("Food added successfully")}
closeFoodModal();renderFoods();updateDashboard();loadOrderFoods();
});
function deleteFood(id){const f=foods.find(x=>x.id===id);if(f&&confirm(`Delete "${f.name}"?`)){foods=foods.filter(x=>x.id!==id);renderFoods();updateDashboard();loadOrderFoods();showToast("Food deleted successfully")}}
function renderCustomers(){
const t=document.getElementById("customerTable");if(!t)return;const s=(document.getElementById("customerSearch")?.value||"").toLowerCase();
t.innerHTML="";customers.filter(c=>c.name.toLowerCase().includes(s)||c.phone.includes(s)).forEach(c=>{const count=orders.filter(o=>o.customerId===c.id).length;t.innerHTML+=`<tr><td>#${c.id}</td><td><strong>${c.name}</strong></td><td>${c.phone}</td><td>${c.address}</td><td>${count}</td><td><button class="action-btn edit-btn" onclick="editCustomer(${c.id})">✎</button><button class="action-btn delete-btn" onclick="deleteCustomer(${c.id})">🗑</button></td></tr>`});
}
function openCustomerModal(id=null){
document.getElementById("customerModal").classList.add("show");document.getElementById("customerForm").reset();document.getElementById("editCustomerId").value="";document.getElementById("customerModalTitle").textContent=id?"Edit Customer":"Add Customer";
if(id!==null){const c=customers.find(x=>x.id===id);document.getElementById("editCustomerId").value=c.id;document.getElementById("customerName").value=c.name;document.getElementById("customerPhone").value=c.phone;document.getElementById("customerAddress").value=c.address}
}
function closeCustomerModal(){document.getElementById("customerModal").classList.remove("show")}
function editCustomer(id){openCustomerModal(id)}
document.getElementById("customerForm").addEventListener("submit",e=>{
e.preventDefault();const id=document.getElementById("editCustomerId").value,n=document.getElementById("customerName").value.trim(),p=document.getElementById("customerPhone").value.trim(),a=document.getElementById("customerAddress").value.trim();
if(!n||!a||!/^\d{10}$/.test(p))return showToast("Enter valid customer details");
if(id){Object.assign(customers.find(x=>x.id===+id),{name:n,phone:p,address:a});showToast("Customer updated successfully")}
else{customers.push({id:customers.length?Math.max(...customers.map(c=>c.id))+1:1,name:n,phone:p,address:a});showToast("Customer added successfully")}
closeCustomerModal();renderCustomers();updateDashboard();loadOrderCustomers();
});
function deleteCustomer(id){const c=customers.find(x=>x.id===id);if(!c)return;if(orders.some(o=>o.customerId===id))return showToast("Cannot delete customer with orders");if(confirm(`Delete "${c.name}"?`)){customers=customers.filter(x=>x.id!==id);renderCustomers();updateDashboard();loadOrderCustomers();showToast("Customer deleted successfully")}}
function loadOrderCustomers(){const s=document.getElementById("orderCustomer");if(!s)return;s.innerHTML='<option value="">Select Customer</option>';customers.forEach(c=>s.innerHTML+=`<option value="${c.id}">${c.name}</option>`)}
function loadOrderFoods(){const s=document.getElementById("orderFood");if(!s)return;s.innerHTML='<option value="">Select Food</option>';foods.filter(f=>f.quantity>0).forEach(f=>s.innerHTML+=`<option value="${f.id}">${f.name}</option>`)}
function updateOrderFood(){const id=+document.getElementById("orderFood").value,f=foods.find(x=>x.id===id);if(!f)return;document.getElementById("orderPrice").value="₹"+f.price;document.getElementById("orderStock").value=f.quantity;document.getElementById("summaryFood").textContent=f.name;document.getElementById("summaryPrice").textContent="₹"+f.price;calculateTotal()}
document.getElementById("orderCustomer").addEventListener("change",function(){const c=customers.find(x=>x.id===+this.value);document.getElementById("summaryCustomer").textContent=c?.name||"-"});
function calculateTotal(){const f=foods.find(x=>x.id===+document.getElementById("orderFood").value),q=+document.getElementById("orderQuantity").value;if(!f)return;document.getElementById("stockError").textContent=q>f.quantity?`Only ${f.quantity} available.`:"";document.getElementById("summaryQuantity").textContent=q||0;document.getElementById("summaryTotal").textContent="₹"+(f.price*Math.max(q,0)).toLocaleString("en-IN")}
document.getElementById("orderForm").addEventListener("submit",e=>{
e.preventDefault();const ci=+document.getElementById("orderCustomer").value,fi=+document.getElementById("orderFood").value,q=+document.getElementById("orderQuantity").value,c=customers.find(x=>x.id===ci),f=foods.find(x=>x.id===fi);
if(!c||!f||q<=0||q>f.quantity)return showToast("Please enter a valid order");
const total=f.price*q;orders.push({id:"ORD"+String(orders.length+1).padStart(3,"0"),customerId:ci,foodId:fi,quantity:q,total,status:"PLACED",date:new Date().toISOString().split("T")[0]});f.quantity-=q;updateDashboard();renderFoods();renderOrders();renderCustomers();renderRecentOrders();loadOrderFoods();e.target.reset();["orderPrice","orderStock"].forEach(id=>document.getElementById(id).value="");["summaryCustomer","summaryFood"].forEach(id=>document.getElementById(id).textContent="-");document.getElementById("summaryPrice").textContent="₹0";document.getElementById("summaryQuantity").textContent="0";document.getElementById("summaryTotal").textContent="₹0";showToast("Order placed successfully!")});
function renderOrders(){const t=document.getElementById("ordersTable");if(!t)return;const s=(document.getElementById("orderSearch")?.value||"").toLowerCase(),st=document.getElementById("statusFilter")?.value||"all";t.innerHTML="";
orders.filter(o=>{const c=customers.find(x=>x.id===o.customerId),f=foods.find(x=>x.id===o.foodId);return(o.id.toLowerCase().includes(s)||c?.name.toLowerCase().includes(s)||f?.name.toLowerCase().includes(s))&&(st==="all"||o.status===st)}).forEach(o=>{const c=customers.find(x=>x.id===o.customerId),f=foods.find(x=>x.id===o.foodId);t.innerHTML+=`<tr><td><strong>${o.id}</strong></td><td>${c?.name||"Unknown"}</td><td>${f?.name||"Unknown"}</td><td>${o.quantity}</td><td>₹${o.total}</td><td><select onchange="changeOrderStatus('${o.id}',this.value)"><option ${o.status==="PLACED"?"selected":""}>PLACED</option><option ${o.status==="PREPARING"?"selected":""}>PREPARING</option><option ${o.status==="COMPLETED"?"selected":""}>COMPLETED</option><option ${o.status==="CANCELLED"?"selected":""}>CANCELLED</option></select></td><td>${o.date}</td><td><button class="action-btn" onclick="viewOrder('${o.id}')">👁</button></td></tr>`})}
function changeOrderStatus(id,status){const o=orders.find(x=>x.id===id);if(o)o.status=status;renderOrders();renderRecentOrders();updateDashboard();showToast("Order status updated")}
function viewOrder(id){const o=orders.find(x=>x.id===id),c=customers.find(x=>x.id===o.customerId),f=foods.find(x=>x.id===o.foodId);document.getElementById("orderDetailsContent").innerHTML=`<div class="order-detail-box"><div class="order-detail-row"><span>Order ID</span><strong>${o.id}</strong></div><div class="order-detail-row"><span>Customer</span><strong>${c?.name||"Unknown"}</strong></div><div class="order-detail-row"><span>Phone</span><strong>${c?.phone||"-"}</strong></div><div class="order-detail-row"><span>Food</span><strong>${f?.name||"Unknown"}</strong></div><div class="order-detail-row"><span>Price</span><strong>₹${f?.price||0}</strong></div><div class="order-detail-row"><span>Quantity</span><strong>${o.quantity}</strong></div><div class="order-detail-row"><span>Status</span><span class="status status-${o.status}">${o.status}</span></div><div class="order-detail-row"><span>Date</span><strong>${o.date}</strong></div><div class="order-detail-total"><span>Total Amount</span><strong>₹${o.total}</strong></div></div>`;document.getElementById("orderModal").classList.add("show")}
function closeOrderModal(){document.getElementById("orderModal").classList.remove("show")}
function toggleDarkMode(){document.body.classList.toggle("dark");showToast(document.body.classList.contains("dark")?"Dark mode enabled":"Light mode enabled")}
function showNotifications(){alert("Notifications\n\n• New order received\n• Pizza stock is low\n• Order ORD001 completed")}
function globalSearch(){const v=document.getElementById("globalSearch").value.trim().toLowerCase();if(!v)return;if(foods.some(f=>f.name.toLowerCase().includes(v)))showPageByName("foods");else if(customers.some(c=>c.name.toLowerCase().includes(v)))showPageByName("customers");else if(orders.some(o=>o.id.toLowerCase().includes(v)))showPageByName("orders")}
function logout(){if(!confirm("Are you sure you want to logout?"))return;document.getElementById("app").classList.add("hidden");document.getElementById("loginPage").classList.remove("hidden");document.getElementById("loginForm").reset();showToast("Logged out successfully")}
let toastTimer;function showToast(msg){const t=document.getElementById("toast");document.getElementById("toastMessage").textContent=msg;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2500)}
window.addEventListener("click",e=>{if(e.target===document.getElementById("foodModal"))closeFoodModal();if(e.target===document.getElementById("customerModal"))closeCustomerModal();if(e.target===document.getElementById("orderModal"))closeOrderModal()});
