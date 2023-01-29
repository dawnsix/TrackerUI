<script>
    import { deviceDataStore } from '../../stores/deviceStore.js'
    import { onMount } from 'svelte';
    import toast from 'svelte-french-toast'

    // origin source
    export let data

    // initialize datastore to maintain local state
    let deviceData
    deviceDataStore.set(data.devices)
    deviceDataStore.subscribe((deviceSrc) => { deviceData = deviceSrc })

    // client vars
    let editMode = false

    // table display test
    let tableHeaders = ["ID","CODE","PIN", "OS","VERSION","UPDATED",
        "MODEL","IN USE?","PROJECT", "WITH", "SCREEN"]

    // functions
    onMount(async () => {
        document.getElementById("inputBar").value = ""
	})

    const filterTable = () => {

        //TODO: switch to store filter since data is housed in store
        
        var input, filter, table, tr, td, i, txtValue, trows
        input = document.getElementById("inputBar")
        filter = input.value.trim().toUpperCase()
        table = document.getElementById("devicetable")
        tr = table.getElementsByTagName("tr")
        
        var ctr = 0

        // depends on column order
        for (i = 1; i < tr.length; i++) {
            trows = tr[i].getElementsByTagName("td")
            td = trows[0].innerHTML +
                trows[1].innerHTML +
                trows[3].innerHTML +
                trows[6].innerHTML +
                trows[8].innerHTML +
                trows[9].innerHTML

            if (td) {
                txtValue = td
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = ""
                    ctr++
                } else {
                    tr[i].style.display = "none"
                }

                if(ctr === 0) 
                    tr[0].style.display = "none"
                else
                    tr[0].style.display = ""
            }
        }

    }

    const isSameState = (newState, oldState) => {

        return newState.deviceid == oldState.deviceid &&
            newState.passcode == oldState.passcode &&
            newState.allocationid == oldState.allocationid &&
            newState.os == oldState.os &&
            newState.osversion == oldState.osversion &&
            newState.dateconfirmed == oldState.dateconfirmed &&
            newState.model == oldState.model &&
            newState.inuse == oldState.inuse &&
            newState.project == oldState.project &&
            newState.transpirecode == oldState.transpirecode &&
            newState.allocation == oldState.allocation &&
            newState.devicecode == oldState.devicecode &&
            newState.screensize == oldState.screensize

    }

    const runEditMode = async (inEdit, device) => {

        const table = document.getElementById("devicetable");

        if(inEdit) {

            for (var r = 1, x = table.rows.length; r < x; r++) {
                if(table.rows[r].cells[0].innerHTML == device.deviceid) {

                    for (var c = 0, y = table.rows[r].cells.length; c < y; c++) {

                        if(table.rows[r].cells[c].id) {
                            if(table.rows[r].cells[c].id == "date") {
                                table.rows[r].cells[c].children[0].setAttribute("disabled", true)
                            }

                            if(table.rows[r].cells[c].id == "restoreBtn") {
                                table.rows[r].cells[c].children[0].hidden = true
                            }

                            if(table.rows[r].cells[c].id == "inUseField") {
                                table.rows[r].cells[c].children[0].classList.remove('in_use_select')
                                table.rows[r].cells[c].children[0].classList.add('in_use_disabled')
                            }

                        } else {table.rows[r].cells[c].setAttribute("contenteditable", false)}
                    }
                } else table.rows[r].classList.remove("killRow")
            }

            return
        }

        for (var r = 1, x = table.rows.length; r < x; r++) {

            if(table.rows[r].cells[0].innerHTML == device.deviceid) {
                for (var c = 0, y = table.rows[r].cells.length; c < y; c++) {

                    if(table.rows[r].cells[c].id) {
                        if(table.rows[r].cells[c].id == "date") {
                            table.rows[r].cells[c].children[0].removeAttribute("disabled")
                        }

                        if(table.rows[r].cells[c].id == "deviceIdRow") {
                            table.rows[r].cells[c].setAttribute("contenteditable", false)
                        }

                        if(table.rows[r].cells[c].id == "deviceCodeRow") {
                            table.rows[r].cells[c].setAttribute("contenteditable", false)
                        }

                        if(table.rows[r].cells[c].id == "restoreBtn") {
                            table.rows[r].cells[c].children[0].hidden = false
                        }

                        if(table.rows[r].cells[c].id == "inUseField") {
                            table.rows[r].cells[c].children[0].classList.remove('in_use_disabled')
                            table.rows[r].cells[c].children[0].classList.add('in_use_select')
                        }

                    } else table.rows[r].cells[c].setAttribute("contenteditable", true)
                }
            } else table.rows[r].classList.add("killRow")
        }
    }

    const getOldRow = (device) => {

        var oldRow = {}

        oldRow['deviceid'] = device.deviceid.trim().length === 0 ? "" : device.deviceid
        oldRow['devicecode'] = device.devicecode.trim().length === 0 ? "" : device.devicecode
        oldRow['passcode'] = device.passcode.trim().length === 0 ? "" : device.passcode
        oldRow['os'] = device.os.trim().length === 0 ? "" : device.os
        oldRow['osversion'] = device.osversion.trim().length === 0 ? "" : device.osversion
        oldRow['dateconfirmed'] = device.dateconfirmed
        oldRow['model'] = device.model.trim().length === 0 ? "" : device.model
        oldRow['inuse'] = device.inuse.toString().trim().length === 0 ? "" : device.inuse
        oldRow['project'] = device.project.trim().length === 0 ? "" : device.project
        oldRow['allocation'] = device.allocation.trim().length === 0 ? "" : device.allocation
        oldRow['screensize'] = device.screensize.trim().length === 0 ? "" : device.screensize

        return oldRow
    }

    const getNewRow = (device) => {
        var rowIdx = 0
        var newRow = {}
        var table = document.getElementById("devicetable");

        for (var i = 0, row; row = table.rows[i]; i++) {
            if(row.cells[0].innerHTML == device.deviceid) {

                rowIdx = i
                
                newRow['deviceid'] = row.cells[0].innerHTML.trim().replace(/<[^>]*>?/gm, '')
                newRow['devicecode'] = row.cells[1].innerHTML.trim().replace(/<[^>]*>?/gm, '')
                newRow['passcode'] = row.cells[2].innerHTML.trim().replace(/<[^>]*>?/gm, '')
                newRow['os'] = row.cells[3].innerHTML.trim().replace(/<[^>]*>?/gm, '')
                newRow['osversion'] = row.cells[4].innerHTML.trim().replace(/<[^>]*>?/gm, '')
                newRow['dateconfirmed'] = row.cells[5].children[0].value
                newRow['model'] = row.cells[6].innerHTML.trim().replace(/<[^>]*>?/gm, '')
                newRow['inuse'] = row.cells[7].children[0].value === 'true'
                newRow['project'] = row.cells[8].innerHTML.trim().replace(/<[^>]*>?/gm, '')
                newRow['allocation'] = row.cells[9].innerHTML.trim().replace(/<[^>]*>?/gm, '')
                newRow['screensize'] = row.cells[10].innerHTML.trim().replace(/<[^>]*>?/gm, '')

                break
            }
        }

        return [newRow, rowIdx]
    }

    const restoreRow = async(row, idx) => {

        var table = document.getElementById("devicetable");
        idx = idx + 1

        table.rows[idx].setAttribute("contenteditable", true)

        for (var c = 0, y = table.rows[idx].cells.length; c < y; c++) {

            table.rows[idx].cells[0].innerHTML = row.deviceid
            table.rows[idx].cells[1].innerHTML = row.devicecode
            table.rows[idx].cells[2].innerHTML = row.passcode
            table.rows[idx].cells[3].innerHTML = row.os
            table.rows[idx].cells[4].innerHTML = row.osversion
            table.rows[idx].cells[5].children[0].value = row.dateconfirmed
            table.rows[idx].cells[6].innerHTML = row.model
            table.rows[idx].cells[7].children[0].value = row.inuse
            table.rows[idx].cells[8].innerHTML = row.project
            table.rows[idx].cells[9].innerHTML = row.allocation
            table.rows[idx].cells[10].innerHTML = row.screensize
        }

        table.rows[idx].setAttribute("contenteditable", false)
    }

    const handleEditMode = async(device, idx) => {

        runEditMode(editMode, device)

        if(editMode) {

            var oldRecord = getOldRow(device)
            var newRecord = getNewRow(device)[0]
            var newRecordIdx = getNewRow(device)[1]

            console.log(JSON.stringify(oldRecord))
            console.log(JSON.stringify(newRecord))
            console.log(JSON.stringify(oldRecord) === JSON.stringify(newRecord))

            // only run update if fields have changed
            if(!isSameState(newRecord, oldRecord)) {

                console.log("no match, updating...")

                editMode = !editMode

                var updateRes = fetch('/api/updatedevice', {
                    method:'POST',
                    body: JSON.stringify(newRecord)
                })

                var wrapper = new Promise(async function(resolve, reject) {
                    var updateResults = await updateRes
                    if(updateResults.status == 200) {

                        // TODO: fix quick succession edits changes of the same row
                        data.devices[newRecordIdx - 1] = newRecord
                        deviceDataStore.set(data.devices)

                        resolve(updateResults)
                        
                    } else {

                        restoreRow(oldRecord, idx)
                        reject(updateResults)

                    }
                })
             
                toast.promise(
                    wrapper, {
                        loading: 'Updating record for device ' + device.model + '...',
                        success: 'Device ' + device.model + ' updated',
                        error: 'Failed to update ' + device.model + ', check AWS',
                    }, {
                        position: "bottom-center",
                        style: 'font-family: Arial !important;' + 
                        ' font-size: 18px; border: 2px solid #ebebeb;' + 
                        ' background-color: black; color: white;'+ 
                        ' border-radius: 0px; width: 800px;'
                    }
                )
            } else {
                editMode = !editMode
            }
        } else {
            editMode = !editMode
        }

    }

</script>

<div class="table_cntnr">

    {#if data.session}

    <div class="div-search ">
        
        <input type="search" id="inputBar" class="inputBar" 
            on:keyup={() => {filterTable()}} 
            placeholder="Search">
        
    </div>

    <div class="div-table">

        <table id="devicetable" class="devicetable">
            <tr>
                {#each tableHeaders as hdr}
                    <th class="hdrRow">{hdr}</th>
                {/each}
            </tr>

            {#each deviceData as device, x}
                <tr>
                    <td style="width:130px; min-width:130px; background-color: #f5f5f5" id="deviceIdRow">{device.deviceid}</td>
                    <td style="width:110px; min-width:110px; background-color: #f5f5f5" id="deviceCodeRow">{device.devicecode}</td>
                    <td style="width:50px; min-width:50px">{device.passcode}</td>
                    <td style="width:60px; min-width:60px">{device.os}</td>
                    <td style="width:60px; min-width:60px">{device.osversion}</td>
                    <td id="date" style="width:115px; min-width:115px"><input class="dateInput" type="date" disabled=true value={device.dateconfirmed}></td>
                    <td style="width:150px; min-width:150px">{device.model}</td>
                    <!--<td style="width:55px; min-width:55px">{device.inuse}</td>-->

                    <td id="inUseField" style="width:58px; min-width:55px">
                        <select class="in_use_disabled" contenteditable="false">

                            {#if device.inuse === true}
                                <option value="true" selected="selected">true</option>
                            {:else}
                                <option value="true">true</option>
                            {/if}

                            {#if device.inuse === false}
                                <option value="false" selected="selected">false</option>
                            {:else}
                                <option value="false">false</option>
                            {/if}

                        </select>
                    </td>

                    <td style="width:120px; min-width:120px">{device.project}</td>
                    <td style="width:120px; min-width:120px">{device.allocation}</td>
                    <td style="width:60px; min-width:60px">{device.screensize}</td>
                    <td id="editField" style="width:37px; min-width:37px" class="editField" contenteditable="false">
                        <label class="switch">
                            <input type="checkbox" on:click={() => { handleEditMode(device, x) }}>
                            <span class="slider"></span>
                        </label>
                    </td>
                    <td id="restoreBtn" class="restoreBtn" style="width:40px; min-width:40px"><button hidden class="button-54" role="button" on:click={() => { restoreRow(device, x) }}>&#8634;</button></td>
                </tr>
            {:else}
                <p>Failed to retrieve database records. Check with admin.</p>
            {/each}
        </table>
    </div>

    <br />

    {:else}
        <div></div>
    {/if}
    
</div>

<style>
	
	:global(body) {
		font-family: Arial !important;
	}

    :global(.killRow) {
        -webkit-filter: blur(2px);
        -moz-filter: blur(2px);
        -o-filter: blur(2px);
        -ms-filter: blur(2px);
        filter: blur(2px);
        background-color: #f5f5f5;
        pointer-events: none;
    }

    :global(.in_use_select) {
        border-radius: 0px;
        border: 0px solid ;
        background-color: white;
    }

    :global(.in_use_disabled) {
        border-radius: 0px;
        border: 0px solid ;
        background-color: white;
        pointer-events: none;
    }

    .div-search {
        padding-bottom: 15px;;
    }

    .inputBar {
        margin: auto;
        display: block;
        font-family: Arial !important;
        background-position: 10px 12px;
        background-repeat: no-repeat;
        text-align: center;
        width: 50%;
        font-size: 16px;
        padding: 12px 20px 12px 40px;
        border: 1px solid rgb(0, 0, 0);
        border-right: 1px solid black;
        border-left: 1px solid black;
        transition: 0.1s;
        max-width: 700px;
    }

    input::placeholder {
		font-family: Arial !important;
		opacity: 0.5;
		color: rgb(255, 0, 0)(197, 197, 197);
	}

    .inputBar:focus {
        margin: auto;
        display: block;
        font-family: Arial !important;
        background-position: 10px 12px;
        background-repeat: no-repeat;
        width: 50%;
        font-size: 16px;
        padding: 12px 20px 12px 40px;
        border: 1px solid rgb(0, 0, 0);
        outline: none !important;
        border:1px solid black;
        border-right: 7px solid black;
        border-left: 7px solid black;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
    }

    .editField {
        border: 0px;
    }

    .restoreBtn {
        border: 0px;
        max-width: 37px;
        min-width: 37px;
    }
 
    .table_cntnr {
        width: 100%;
    }

    .devicetable {
        overflow: hidden;
        white-space: nowrap;
        margin-right: auto;
        margin-left: auto;
        font-size: 14px;
    }

    .hdrRow {
        text-align: left;
        color: white;
        background-color: black;
        padding-left: 3px;
    }

    th {
        border: 1px solid;
    }

    td {
        border: 1px solid;
        padding-left: 3px;
    }

    /*restore btn*/
    .button-54 {
        font-family: Arial !important;
        font-size: 22px;
        text-decoration: none;
        text-transform: uppercase;
        color: #000;
        cursor: pointer;
        border: 1px solid;
        /*padding: 0.25em 0.5em;*/
        padding: 0em 0.25em;
        box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px;
        position: relative;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
    }

    .button-54:active {
        box-shadow: 0px 0px 0px 0px;
        top: 3px;
        left: 3px;
    }

    /*
    @media (min-width: 768px) {
        .button-54 {
            padding: 0em 0.25em;
        }
    }
    */

    /*checkbox*/
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    /* Hide default HTML checkbox */
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    /* The slider */
    .slider {
        position: absolute;
        cursor: pointer;
        border: 1px solid;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
        -webkit-transition: .1s;
        transition: .1s;
        box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px;
    }

    .slider:before {
        position: absolute;
        border: 1px solid;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: #ccc;
        -webkit-transition: .1s;
        transition: .1s;
        box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px;
    }

    input:checked + .slider {
        background-color: #79AF79;
        /*background-color: #b51919;*/
        box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px rgb(0, 0, 0);
        box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
        box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px;
    }

    /* date */
    .dateInput {
        font-family: Arial !important;
    }

    /* input search */
    

</style>
