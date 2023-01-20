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
    let tableHeaders = ["Device ID","DeviceCode","Passcode", "OS","OS Version","Date Confirmed",
        "Model","In Use?","Project", "Allocated to", "ScreenSize"]

    // functions
    onMount(async () => {
		//console.log(data.devices)
	});

    const filterTable = () => {
        
        var input, filter, table, tr, td, i, txtValue, trows
        input = document.getElementById("inputBar")
        filter = input.value.toUpperCase()
        table = document.getElementById("devicetable")
        tr = table.getElementsByTagName("tr")

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
                } else {
                    tr[i].style.display = "none"
                }
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
            newState.inuse == oldState.inuse.toString() &&
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
                
                newRow['deviceid'] = row.cells[0].innerHTML.trim()
                newRow['devicecode'] = row.cells[1].innerHTML.trim()
                newRow['passcode'] = row.cells[2].innerHTML.trim()
                newRow['os'] = row.cells[3].innerHTML.trim()
                newRow['osversion'] = row.cells[4].innerHTML.trim()
                newRow['dateconfirmed'] = row.cells[5].children[0].value
                newRow['model'] = row.cells[6].innerHTML.trim()
                newRow['inuse'] = row.cells[7].innerHTML.trim()
                newRow['project'] = row.cells[8].innerHTML.trim()
                newRow['allocation'] = row.cells[9].innerHTML.trim()
                newRow['screensize'] = row.cells[10].innerHTML.trim()

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
            table.rows[idx].cells[7].innerHTML = row.inuse
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

            console.log(newRecordIdx)
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
                        loading: 'Updating record for device ' + device.deviceid + '...',
                        success: 'Device ' + device.deviceid + ' updated',
                        error: 'Failed to update ' + device.deviceid + ', check AWS',
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

<div>

    {#if data.session}

        <input type="text" id="inputBar" on:keyup={() => {filterTable()}} 
            placeholder="Search by name, platform, device ID, or device code...">

        <form action="/logout" method="POST"><button>logout</button></form>

        <table id="devicetable">
            <tr>
                {#each tableHeaders as hdr}
                    <th>{hdr}</th>
                {/each}
                <th>edit</th>
            </tr>

            {#each deviceData as device, x}
                <tr>
                    <td>{device.deviceid}</td>
                    <td>{device.devicecode}</td>
                    <td>{device.passcode}</td>
                    <td>{device.os}</td>
                    <td>{device.osversion}</td>
                    <td id="date"><input type="date" disabled=true value={device.dateconfirmed}></td>
                    <td>{device.model}</td>
                    <td>{device.inuse}</td>
                    <td>{device.project}</td>
                    <td>{device.allocation}</td>
                    <td>{device.screensize}</td>
                    <td id="editField" contenteditable="false"><input type="checkbox" 
                        on:click={() => { handleEditMode(device, x) }}></td>
                    <td id="restoreBtn"><button on:click={() => { restoreRow(device, x) }}>restore</button></td>
                </tr>
            {:else}
                <p>Failed to retrieve database records. Check with admin.</p>
            {/each}
        </table>

    {:else}
        <div></div>
    {/if}
</div>

<style>
    #inputBar {
      background-position: 10px 12px;
      background-repeat: no-repeat;
      width: 50%;
      font-size: 16px;
      padding: 12px 20px 12px 40px;
      border: 1px solid #ddd;
      margin-bottom: 12px;
    }

    :global(.killRow) {
      -webkit-filter: blur(2px);
      -moz-filter: blur(2px);
      -o-filter: blur(2px);
      -ms-filter: blur(2px);
      filter: blur(2px);
      background-color: #ccc;
      pointer-events: none;
    }
</style>