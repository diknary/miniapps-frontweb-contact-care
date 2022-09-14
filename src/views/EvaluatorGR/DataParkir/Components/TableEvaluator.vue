<template>
<div>
    <div class="search-container">
        <label for="searchGrid" class="search-label">No. Kontrak</label>
        <base-input
        id="searchGrid"
        type="text"
        v-model="searchQuery"
        @change="searchChange"
        />
    </div>
    
    <b-overlay :show="isLoading" rounded="sm">
        <div class="menu__content-grid">
            <table style="width: 100%" class="table table-hover">
            <tbody>
                <tr>
                <th>No</th>
                <th>Area</th>
                <th>Cabang</th>
                <th>OID</th>
                <th>No Kontrak</th>
                <th>Note</th>
                <th class="th-status">
                    <b-form-select 
                    v-model="selectedStatus" 
                    :options="optionsStatusSearch" 
                    class="status-options"
                    />
                </th>
                </tr>
                <tr v-if="filtered.length === 0">
                <td colspan="11">No Data Found</td>
                </tr>
                <tr v-for="(data, index) in itemsShow" v-bind:key="index" >
                <td class="td-text">{{ getNo(index) }}</td>
                <td class="td-text">{{ data.area }}</td>
                <td class="td-text">{{ data.cabang + " - " +data.namaCabang }}</td>
                <td class="td-text">{{ data.oid }}</td>
                <td class="td-text">{{ data.noKontrak }}</td>
                <td class="td-text">{{ getNote(data.status) }}</td>
                <td class="td-button">
                    <base-button
                    type="button"
                    isPrimary
                    ref="filtered"
                    :class="getBtnClass(data.status)"
                    v-on:click="onViewKontrak(data, index)"
                    >{{getStatusText(data.status)}}</base-button
                    >
                </td>
                </tr>
            </tbody>
            </table>

            <ul class="pagination justify-content-end">
                <b-pagination-nav
                v-model="currentPage"
                :number-of-pages="getTotalPage"
                base-url="#"
                first-number
                last-number
                class="pagination"
                ></b-pagination-nav>
            </ul>
        </div>
    </b-overlay>
</div>
</template>

<script>
import BaseButton from "@/components/UI/BaseButton";
import EGRBaseInput from "@/components/FormsElement/EvaluatorGR/EGRBaseInput.vue";

export default {
    components: {
        "base-button": BaseButton,
        "base-input": EGRBaseInput,
    },
    props:{
        value:{
            type:Object,
            default:function(){
                return {
                    oid:"",
                    noKontrak:"",
                    cabang:"",
                    note:"",
                    status:""
                }
            }
        },
        listData:{
            type:Object,
            default:function(){
                return {
                    data:[]
                }
            }
        },
        isLoading:{
            type:Boolean,
            default:false
        },
    },
    data (){
        return {
            searchQuery: {
                value:"",
                isValid:true,
                error:"",
                validators:[]
            },
            optionsStatusSearch:[
                {value:"", text:"Status"},
                {value:"0", text:"Need Check"},
                {value:"1", text:"Need Approval"},
                {value:"2", text:"Need Confirm"}
            ],
            selectedStatus:"",
            currentPage: 1,
            itemPerpage:10,
        }
    },
    methods:{
        onViewKontrak(data){
            let getData = {
                idEvaluator:data.evaluatorId,
                oid:data.oid,
                noKontrak:data.noKontrak,
                cabang:data.cabang,
                note:data.note,
                status:data.status
            };
            this.$emit("click", getData);
        },
        getBtnClass(status){
            switch(status) {
                case "0":
                    return [{"btn-needcheck":true}];
                case "1":
                    return [{"btn-needapproval":true}];
                case "2":
                    return [{"btn-needconfirm":true}];
                default:
                    return "";
            }
        },
        getStatusText(status){
            switch(status) {
                case "0":
                    return "Need Check";
                case "1":
                    return "Need Approval";
                case "2":
                    return "Need Confirm";
                default:
                    return "";
            } 
        },
        getNo(index){
            return index+1 + ((this.currentPage-1) * this.itemPerpage);
        },
        getNote(status){
            return status == "2" ? "NOTE" : "-";
        },
        searchChange(){
            this.currentPage = 1;
        }
    },
    computed: {
        getTotalPage(){
            let total = this.filtered ? Math.ceil(this.filtered.length/this.itemPerpage) : 1;
            return total == 0 ? 1 : total;
        },
        itemsShow(){
            let skip = (this.currentPage - 1) * this.itemPerpage;
            let take = this.currentPage * this.itemPerpage;
            return this.filtered.slice(skip, take);
        },
        filterStatus(){
            if(!this.listData.data){
                return [];
            }
            if (this.selectedStatus.trim() === ""){
                return this.listData.data;
            }
            return this.listData.data.filter((data) => {
                return data.status == this.selectedStatus;
            });
        },
        filtered(){
            return this.filterStatus.filter((data) => {
                return data.noKontrak.includes(this.searchQuery.value.trim());
            });
        }
    },

}
</script>

<style scoped>

.status-options{
    border:none;
    background-color: #ffc5bf;
    padding: 0;
    text-align: center;
    font-weight: bold;
    width: 85%;
    color: black;
    font-size: 14px;
    cursor:pointer;
}

.status-options option{
    background-color: white;
    font-size: 1rem;
}

.status-options:focus{
    box-shadow: none;
}

td.td-text{
    padding: 10px 6px 0 6px;
    height: 40px;
}

th.th-status{
    padding:0;
    padding-top: 5px;
}

td.td-button{
    padding: 5px;
}
table .td-button .primary{
    border-radius: 4px;
    width: 90%;
}
.td-button .primary:hover{
    background-color: #95a5a6;
}
.primary.btn-needcheck{
    background-color: #e74c3c;
}
.primary.btn-needapproval{
    background-color: #2ecc71;
}
.primary.btn-needconfirm{
    background-color: #f1c40f;
}
.menu {
  border-radius: 10px;
  padding: 20px 20px 0px;
  height: inherit;
  background-color: #f8f9fa;
}

.menu__content-grid {
  padding: 20px;
  padding-top: 5px;
}

.col-form-label-sm{
    text-align: left;
    margin: 0;
    padding: 5px 5px 5px 35px;
}

.search-container{
    display: flex;
    justify-content: left;
    margin: 5px;
}

.search-label{
    margin: 0;
    padding: 5px 15px 5px 25px;
    font-size: 1rem;
}

.search-input{
    margin-left: 5px;
}

label {
  text-align: end;
}

h1 {
  font-size: 12px;
  font-weight: bold;
}

tr {
  text-align: center;
  font-size: 14px;
  cursor: pointer;
}

th {
  background-color: #ffc5bf;
  text-align: center;
}

form {
  text-align: right;
  padding-bottom: 10px;
}

.page-item {
  cursor: pointer;
}

.background {
  background-color: transparent;
}

.page-item.active .page-link{
  background-color: #ffc5bf;
  border-color: #ffc5bf;
  color: rgba(0, 0, 0, 0.795);
}
.pagination .page-link{ 
  color: rgba(0, 0, 0, 0.795);
}

</style>
