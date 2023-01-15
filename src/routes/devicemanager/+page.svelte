<script>
    import { deviceDataStore } from '../../stores/deviceStore.js';
    
    // origin source
    export let data

    // initialize datastore to maintain local state
    let deviceData
    deviceDataStore.set(data.devices.Items)
    deviceDataStore.subscribe((deviceSrc) => { deviceData = deviceSrc })

    let editPreState = null 
    let inEdit = false
    let editIdx = 0
    let tableHeaders = ["Device ID","Passcode","Allocation ID", "OS","OS Version","Date Confirmed",
        "Model","In Use?","Project","Allocation","DeviceCode","ScreenSize"]
    let headers = ["DeviceID","Passcode","AllocationID", "OS","OSVersion","DateConfirmed",
        "Model","InUse","Project","TranspireCode","Allocation","DeviceCode","ScreenSize"]

    function toggleEdit(device) {

        if(editPreState == null) 
            editPreState = device

        editMode(device)
        handleInput()

        inEdit = !inEdit

    }

    function editMode(device) {

        var table = document.getElementById("devicetable");

        // if in edit mode, kill all other rows and enable editing in target row, else inverse
        if(inEdit) {
            for (var r = 1, x = table.rows.length; r < x; r++) {
                if(table.rows[r].cells[0].innerHTML == device.DeviceID) {
                    for (var c = 0, y = table.rows[r].cells.length; c < y; c++)
                        if(table.rows[r].cells[c].id != "editField" &&
                           table.rows[r].cells[c].id != "restoreBtn")
                            table.rows[r].cells[c].setAttribute("contenteditable", false)
                } else table.rows[r].classList.remove("killrow")
            }

            return
        }

        for (var r = 1, x = table.rows.length; r < x; r++) {
            if(table.rows[r].cells[0].innerHTML == device.DeviceID) {
                editIdx = r
                for (var c = 0, y = table.rows[r].cells.length; c < y; c++)
                    if(table.rows[r].cells[c].id != "editField" && 
                       table.rows[r].cells[c].id != "restoreBtn")
                        table.rows[r].cells[c].setAttribute("contenteditable", true)
            } else table.rows[r].classList.add("killrow")
        }

    }

    async function handleInput() {

        // build our device object from the current row if in edit mode
        if(inEdit) {
            var [outjson, postobj, updatedRow] = [{}, {}, null]
            updatedRow = document.getElementById("devicetable").rows[editIdx]

            headers.forEach((hrd, i) => {
                // build again as 'postobj' to match local schema (fix this in aws!)
                outjson[hrd.toLocaleLowerCase()] = updatedRow.cells[i].innerHTML
                postobj[hrd] = updatedRow.cells[i].innerHTML
            })

            // if the record has updated, send a request to local API then AWS API to update record
            // if successful, update local datastore which will dyna-update table else inverse
            if(!isSameState(outjson)) {
                await fetch('/api/devicemanager', {
                    method: 'POST',
                    body: JSON.stringify(outjson)
                }).then((response) => {
                    if(response.status == 200) {
                        data.devices.Items[editIdx - 1] = postobj
                        deviceDataStore.set(data.devices.Items)
                    }
                    else { 
                        alert('update failed - check backend')
                        deviceDataStore.set(data.devices.Items)
                    }
                })
            }
            
            editPreState = null
            editIdx = 0
        }

    }

    // compare pre-state and newly built post-state objects to see whether we need to update
    function isSameState(newstate) {

        return newstate.deviceid == editPreState.DeviceID &&
            newstate.passcode == editPreState.Passcode &&
            newstate.allocationid == editPreState.AllocationID.toString() &&
            newstate.os == editPreState.OS &&
            newstate.osversion == editPreState.OSVersion &&
            newstate.dateconfirmed == editPreState.DateConfirmed &&
            newstate.model == editPreState.Model &&
            newstate.inuse == editPreState.InUse.toString() &&
            newstate.project == editPreState.Project &&
            newstate.transpirecode == editPreState.TranspireCode &&
            newstate.allocation == editPreState.Allocation &&
            newstate.devicecode == editPreState.DeviceCode &&
            newstate.screensize == editPreState.ScreenSize

    }

    function resetRow() {

        // temp solution, look into why store state not working
        if(inEdit) {

            var cells = document.getElementById("devicetable").rows[editIdx].cells;
            cells[0].innerHTML = editPreState.DeviceID
            cells[1].innerHTML = editPreState.Passcode
            cells[2].innerHTML = editPreState.AllocationID
            cells[3].innerHTML = editPreState.OS
            cells[4].innerHTML = editPreState.OSVersion
            cells[5].innerHTML = editPreState.DateConfirmed
            cells[6].innerHTML = editPreState.Model
            cells[7].innerHTML = editPreState.InUse
            cells[8].innerHTML = editPreState.Project
            cells[9].innerHTML = editPreState.TranspireCode
            cells[10].innerHTML = editPreState.Allocation
            cells[11].innerHTML = editPreState.DeviceCode
            cells[12].innerHTML = editPreState.ScreenSize
        }

    }

    function filterTable() {
        
        var input, filter, table, tr, td, i, txtValue, trows
        input = document.getElementById("inputBar")
        filter = input.value.toUpperCase()
        table = document.getElementById("devicetable")
        tr = table.getElementsByTagName("tr")

        // depends on column order
        for (i = 1; i < tr.length; i++) {
            trows = tr[i].getElementsByTagName("td")
            td = trows[0].innerText + 
                trows[3].innerText + 
                trows[6].innerText + 
                trows[8].innerText + 
                trows[9].innerText + 
                trows[10].innerText

            if (td) {
                txtValue = td
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = ""
                } else {
                    tr[i].style.display = "none"
                }
            }
        }

    }

</script>

<div>

    {#if data.session}

        <input type="text" id="inputBar" on:keyup={ () => {filterTable()} } placeholder="Search by name, platform, device ID, or device code...">
        <form action="/logout" method="POST"><button>logout</button></form>

        <table id="devicetable">
            <tr>
                {#each tableHeaders as hdr}
                    <th>{hdr}</th>
                {/each}
                <th>edit</th>
            </tr>

            {#each deviceData as device (device.DeviceID)}
                <tr>
                    <td>{device.DeviceID}</td>
                    <td>{device.Passcode}</td>
                    <td>{device.AllocationID}</td>
                    <td>{device.OS}</td>
                    <td>{device.OSVersion}</td>
                    <td>{device.DateConfirmed}</td>
                    <td>{device.Model}</td>
                    <td>{device.InUse}</td>
                    <td>{device.Project}</td>
                    <td style="display:none;">{device.TranspireCode}</td>
                    <td>{device.Allocation}</td>
                    <td>{device.DeviceCode}</td>
                    <td>{device.ScreenSize}</td>
                    <td id="editField">
                        <label class="switch">
                            <input type="checkbox" on:click={() => { toggleEdit(device) }}>
                            <span class="slider"></span>
                        </label>
                    </td>
                    <td id="restoreBtn"><button on:click={ () => {resetRow()} }>restore</button></td>
                </tr>
            {:else}
                <p>Failed to retrieve database records. Check with admin.</p>
            {/each}
        </table>

        {:else}
            <h1>nah</h1>
        {/if}
</div>

<style>

    #inputBar {
      background-position: 10px 12px; /* Position the search icon */
      background-repeat: no-repeat; /* Do not repeat the icon image */
      width: 50%; /* Full-width */
      font-size: 16px; /* Increase font-size */
      padding: 12px 20px 12px 40px; /* Add some padding */
      border: 1px solid #ddd; /* Add a grey border */
      margin-bottom: 12px; /* Add some space below the input */
    }

    :global(.killrow) {
      -webkit-filter: blur(2px);
      -moz-filter: blur(2px);
      -o-filter: blur(2px);
      -ms-filter: blur(2px);
      filter: blur(2px);
      background-color: #ccc;
      pointer-events: none;
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }
    
    .switch input { 
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: .4s;
      transition: .4s;
    }
    
    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }
    
    input:checked + .slider {
      background-color: #6e0c0c;
    }
    
    input:focus + .slider {
      box-shadow: 0 0 1px #6e0c0c;
    }
    
    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
    
    </style>