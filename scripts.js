$(document).ready(function () {
    // Get default memory block
    const memoryBlockDefault = document.getElementById('memory').innerHTML;
    function resetMemoryBlock(){
        console.log("Resetting Memory Block")
        document.getElementById('memory').innerHTML = memoryBlockDefault;
    };

    // Get default custom block
    const customBlockDefault = document.getElementById('custom').innerHTML;
    function resetCustomBlock(){
        console.log("Resetting Custom Block")
        customArr = [];
        document.getElementById('custom').innerHTML = customBlockDefault;
    };

    // Get default custom seq block
    const customSeqTableDefault = document.getElementById('customSeqBlock').innerHTML;
    function resetCustomSeqBlock(){
        console.log("Resetting Custom Sequence Block")
        document.getElementById('customSeqBlock').innerHTML = customSeqTableDefault;
    };

    // Get default cache block
    const cacheBlockDefault = document.getElementById('cache').innerHTML;
    function resetCacheBlock(){
        console.log("Resetting Cache Block")
        document.getElementById('cache').innerHTML = cacheBlockDefault;
    };
    
    // Resets variables
    function resetEverything(cacheArr, index) {
        cache_access_time = 1, memory_access_time = 10;
        block = 0, index_counter = 0 ;
        memoryAccessCount = 0, cacheHitCount = 0, cacheMissCount = 0;    
        isFinishBtn = false;

        for (let i = 0; i < cacheArr.length; i++) {
            cacheArr[i].fill(null);
            index[i] = 0;
        }

        fStatus = [], fSet = [], fBlock = [];

        resetCacheBlock();
        $("#nextStepBtn").show();
        $("#finalSnapshotContainer").hide();
        document.getElementById("customSequenceCase").style.background = "rgb(196, 117, 192)";
        document.getElementById("testCase1").style.background = "rgb(196, 117, 192)";
        document.getElementById("testCase2").style.background = "rgb(196, 117, 192)";
        document.getElementById("testCase3").style.background = "rgb(196, 117, 192)";
        document.getElementById("finishBtn").innerHTML = "FINISH";
        document.getElementById("customRunBtn").innerHTML = "Run Sequence";
        
        $("#nextStepBtn").prop("disabled", true);
        $("#finishBtn").prop("disabled", true);
    };

    let waitForPressResolve;

    function waitForNextStep() {
        return new Promise(resolve => waitForPressResolve = resolve);
    }

    function nextStep() {
        if (waitForPressResolve) waitForPressResolve();
    };

    var isFinishBtn = false;
    $("#finishBtn").click(function(){
        console.log("Finish him!")
        if (waitForPressResolve) waitForPressResolve();
        isFinishBtn = true;
        $("#nextStepBtn").hide();
        document.getElementById("finishBtn").innerHTML = "FINISHED";
        $(this).prop("disabled", true);
    });

    function finished() {
        console.log("Finished")
        $("#nextStepBtn").hide();
        document.getElementById("finishBtn").innerHTML = "FINISHED";
        document.getElementById("finishBtn").disabled = true;
    };

    function appendHitMiss(id, hit){
        if (hit==1){
            $(id).append("<td style='background-color: green; color:white;'>HIT</td>");
            $(id).append("<td>"+block+"</td>");
            $(id).append("<td>"+index_counter+"</td></tr>");
        } else {
            $(id).append("<td style='background-color: red; color:white;'>MISS</td>");
            $(id).append("<td>"+block+"</td>");
            $(id).append("<td>"+index_counter+"</td></tr>");
        }
        // condition ? true_expression : false_expression
        return hit == 1 ? "Hit" : "Miss";
    };

    // Stores Status, Set, and Block for File Purposes
    function updateFileArrays(hit, block, index_counter){
        fStatus.push(hit), 
        fSet.push(block), 
        fBlock.push(index_counter);
    }

    // AT START SCREEN
    $("#memoryBlock").hide();
    $("#customSeqBlock").hide();
    $("#customRunBtn").hide();
    $("#finalSnapshotContainer").hide();
    $("#nextStepBtn").prop("disabled", true);
    $("#finishBtn").prop("disabled", true);

    // Variables <3 Variables <3  Variables <3  Variables <3  Variables <3  Variables <3  Variables <3 
    const num_sets = 8, num_blockperset = 4;

    let cacheArr = new Array(num_sets).fill(null).map(() => new Array(num_blockperset).fill(null));
    let index = new Array(num_sets).fill(0);

    let cache_access_time = 1, memory_access_time = 10;
    let block = 0, index_counter = 0 ;
    let memoryAccessCount = 0, cacheHitCount = 0, cacheMissCount = 0;

    // For file purposes
    let fStatus = new Array, fSet = new Array, fBlock = new Array;

    function set_num(n, i) { return n % i; }

    var customArr = new Array; // custom sequence user input array

    function check_num(arr, key) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== null && arr[i] === key) {
                console.log("Cache Hit: " + key);
                return true;
            }
        }
        console.log("Cache Miss: " + key);
        return false;
    };

    function printToCache(){
        let idxCB = "CB" + block + index_counter;
        document.getElementById(idxCB).innerHTML = cacheArr[block][index_counter];
    };
             
    function printToSnapshot(){
        missPenalty = cache_access_time + memory_access_time * 2 + cache_access_time;
        averageMemoryAccessTime = (cacheHitCount/memoryAccessCount) * cache_access_time + (cacheMissCount/memoryAccessCount) * missPenalty;
        totalMemoryAccessTime = memoryAccessCount * averageMemoryAccessTime;
        $('#finalSnapshot').html('Memory Access Count: ' + memoryAccessCount + '<br>' +
                                'Hits: ' + cacheHitCount + '<br>' +
                                'Hit Rate: ' + cacheHitCount/memoryAccessCount + '<br>' +
                                'Misses: ' + cacheMissCount + '<br>' +
                                'Miss Rate: ' + cacheMissCount/memoryAccessCount + '<br>' +
                                'Average Memory Access Time: ' + averageMemoryAccessTime + 'ns<br>' +
                                'Total Memory Access Time: ' + totalMemoryAccessTime + 'ns<br>')
        
    };

    // Test Case 1
    $("#testCase1").click(async function(){
        console.log("Test Case 1")
        resetMemoryBlock();
        resetEverything(cacheArr, index);
        $("#customBlock").hide();
        $("#customSeqBlock").hide();
        $("#customRunBtn").hide();
        $("#memoryBlock").show();
        $("#nextStepBtn").prop("disabled", false);        
        $("#finishBtn").prop("disabled", false);
        document.getElementById("testCase1").style.background = "rgb(94, 194, 94)";  
        let status = 0;

        testCase1Arr = Array.from({ length: 256}, (_, i) => i % 256);

        let j = 0; // j = value from 0-63
        for (let i = 0; i < 256; i++) {
            if (isFinishBtn == false)
                document.getElementById("nextStepBtn").addEventListener('click', nextStep);
            else document.getElementById("nextStepBtn").removeEventListener('click', nextStep);
                
            memoryAccessCount++;

            if (j<64){
                $("#memory").append("<tr>");
                $("#memory").append("<td>" + j + "</td>");
                testCase1Arr[i] = j;
                block = set_num(testCase1Arr[i], num_sets);
                index_counter = index[block];
                if (check_num(cacheArr[block], testCase1Arr[i])) {
                    status = appendHitMiss("#memory", 1)
                    printToCache();
                    cacheHitCount++;
                } else {
                    status = appendHitMiss("#memory", 0)
                    cacheMissCount++;
                    cacheArr[block][index_counter] = testCase1Arr[i];
                    printToCache();
                    index[block]++;
                    if (index[block] >= num_blockperset) {
                        index[block] = 0;
                    }
                }
                updateFileArrays(status, block, index_counter);
                j++;
            } else { j=0; i--; memoryAccessCount--;}
            
            if (i==255) { finished(); break; }
            if (isFinishBtn == false) await waitForNextStep();
        }
        document.getElementById("nextStepBtn").removeEventListener('click', nextStep);
        printToSnapshot();
        $("#finalSnapshotContainer").show();
    });

    // Test Case 2
    $("#testCase2").click(async function(){
        console.log("Test Case 2")
        resetMemoryBlock();
        resetEverything(cacheArr, index);
        $("#customBlock").hide();
        $("#customSeqBlock").hide();
        $("#customRunBtn").hide();
        $("#memoryBlock").show();
        $("#nextStepBtn").prop("disabled", false);        
        $("#finishBtn").prop("disabled", false);
        document.getElementById("testCase2").style.background = "rgb(94, 194, 94)";  
        let status = 0;

        testCase2Arr = Array.from({ length: 128}, (_, i) => i % 128);  

        for (let j = 0; j < 128; j++) {
            if (isFinishBtn == false)
                document.getElementById("nextStepBtn").addEventListener('click', nextStep);
            else document.getElementById("nextStepBtn").removeEventListener('click', nextStep);

            memoryAccessCount++;

            $("#memory").append("<tr>");
            randInt = Math.floor(Math.random() * 128); // Returns a value from 0-127
            $("#memory").append("<td>" + randInt + "</td>");

            testCase2Arr[j] = randInt;

            block = set_num(testCase2Arr[j], num_sets);
            index_counter = index[block];
            
            if (check_num(cacheArr[block], testCase2Arr[j])) {
                status = appendHitMiss("#memory", 1);
                printToCache();
                cacheHitCount++;
            } else {
                status = appendHitMiss("#memory", 0);
                cacheMissCount++;
                cacheArr[block][index_counter] = testCase2Arr[j];
                printToCache();
                index[block]++;
                if (index[block] >= num_blockperset) {
                    index[block] = 0;
                }
            }
            updateFileArrays(status, block, index_counter);
            if (j==127) { finished(); break; }
            if (isFinishBtn == false) await waitForNextStep();
        }
        document.getElementById("nextStepBtn").removeEventListener('click', nextStep);
        printToSnapshot();
        $("#finalSnapshotContainer").show();
    });


    // Test Case 3
    $("#testCase3").click(async function(){
        console.log("Test Case 3")
        resetMemoryBlock();
        resetEverything(cacheArr, index);
        $("#customBlock").hide();
        $("#customSeqBlock").hide();
        $("#customRunBtn").hide();
        $("#memoryBlock").show();
        $("#nextStepBtn").prop("disabled", false);        
        $("#finishBtn").prop("disabled", false);
        document.getElementById("testCase3").style.background = "rgb(94, 194, 94)";  
        let status = 0;

        testCase3Arr = Array.from({length: 376}, (_, i) => i % 128)
        let sequenceArr = [];
        
        var j = 0, k = 1; // j = memory value, k = 4n
        for (let i = 0; i < 376; i++) {
            if (isFinishBtn == false)
                document.getElementById("nextStepBtn").addEventListener('click', nextStep);
            else document.getElementById("nextStepBtn").removeEventListener('click', nextStep);
            
            memoryAccessCount++;

            if (j<94) {
                if (j<31){
                    sequenceArr[i] = j;
                    testCase3Arr[i] = sequenceArr[i];
                    $("#memory").append("<tr>");
                    $("#memory").append("<td>" + sequenceArr[i] + "</td>");
                } else if (j<62){
                    sequenceArr[i] = k;
                    testCase3Arr[i] = sequenceArr[i];
                    $("#memory").append("<tr>");
                    $("#memory").append("<td>" + sequenceArr[i] + "</td>");
                    k++;
                } else {
                    sequenceArr[i] = k;
                    testCase3Arr[i] = sequenceArr[i];
                    $("#memory").append("<tr>");
                    $("#memory").append("<td>" + sequenceArr[i] + "</td>");
                    k++
                }

                block = set_num(testCase3Arr[i], num_sets);
                index_counter = index[block];

                if (check_num(cacheArr[block], testCase3Arr[i])) {
                    status = appendHitMiss("#memory", 1);
                    printToCache();
                    cacheHitCount++;
                } else {
                    status = appendHitMiss("#memory", 0);
                    cacheMissCount++;
                    cacheArr[block][index_counter] = testCase3Arr[i];
                    printToCache();
                    index[block]++;
                    if (index[block] >= num_blockperset) {
                        index[block] = 0;
                    }
                }
                j++
                updateFileArrays(status, block, index_counter);
            } else { j = 0; i--; k = 1; memoryAccessCount--;}

            if (i==375) { finished(); break; }
            if (isFinishBtn == false) await waitForNextStep();         
        }
        document.getElementById("nextStepBtn").removeEventListener('click', nextStep);
        printToSnapshot();
        $("#finalSnapshotContainer").show();
    });

    // Custom Sequence Trigger
    $("#customSequenceCase").click(function(){
        console.log("Custom Sequence Case")
        resetCustomBlock();
        resetEverything(cacheArr, index);
        $("#customBlock").show();
        $("#memoryBlock").hide();
        $("#customSeqBlock").hide();
        $("#customRunBtn").hide();
        document.getElementById("customSequenceCase").style.background = "rgb(94, 194, 94)";
    });

    // Run Custom Sequence
    $("#customRunBtn").click(async function(){
        console.log("Running Custom Sequence")
        resetMemoryBlock();
        resetCustomSeqBlock();
        resetEverything(cacheArr, index);
        $("#customBlock").hide();
        $("#customSeqBlock").show();
        $("#nextStepBtn").prop("disabled", false);        
        $("#finishBtn").prop("disabled", false);
        document.getElementById("customSequenceCase").style.background = "rgb(94, 194, 94)";
        document.getElementById("customRunBtn").innerHTML = "RUNNING SEQUENCE...";
        $("#customRunBtn").prop("disabled", true);
        let status = 0;

        for(let j=0; j<customArr.length; j++){
            if (isFinishBtn == false)
                document.getElementById("nextStepBtn").addEventListener('click', nextStep);
            else document.getElementById("nextStepBtn").removeEventListener('click', nextStep);

            memoryAccessCount++;
            $("#customSeq").append("<tr>");
            $("#customSeq").append("<td>" + customArr[j] + "</td>");
            block = set_num(customArr[j], num_sets);
            index_counter = index[block];

            if (check_num(cacheArr[block], customArr[j])) {
                status = appendHitMiss("#customSeq", 1);
                printToCache();
                cacheHitCount++;
            } else {
                status = appendHitMiss("#customSeq", 0);
                cacheMissCount++;
                cacheArr[block][index_counter] = customArr[j];
                printToCache();
                index[block]++;
                if (index[block] >= num_blockperset) {
                    index[block] = 0;
                }
            }
            updateFileArrays(status, block, index_counter);
            if (j==customArr.length-1) { finished(); break; }
            if (isFinishBtn == false) await waitForNextStep();
        } 
        document.getElementById("nextStepBtn").removeEventListener('click', nextStep);
        printToSnapshot();
        $("#finalSnapshotContainer").show();
    });

    // New User Input (Enter)
    $("#custom").change(function(){
        console.log("New User Input")
        $("#customRunBtn").show();
        $("#customRunBtn").prop("disabled", false);
        let newInput = $("#input").val();

        var newTR = '<tr> <td>' + newInput + '</td> </tr>';
        
        if (document.getElementById("input").value !="") input.value = ""; 
        $("#custom").append(newTR);

        // Insert values in an array
        customArr.push(newInput);
        console.log(customArr)
    });

    // Download Snapshot
    $("#downloadBtn").click(function(){
        console.log("Downloading Snapshot")
        var fname = "";
        memoryBlockLength = 0;
        memorySequenceBlock = new Array;
        // text content
        text="4-WAY BSA + FIFO"
    
        if (document.getElementById("customSequenceCase").style.background =="rgb(94, 194, 94)"){
            console.log("Download custom sequence")
            fname = "4-WAY BSA FIFO Custom Sequence"
            text += ": Custom Sequence\n=====================================\n\n"
            memoryBlockLength = customArr.length
            memorySequenceBlock = customArr
        } else if (document.getElementById("testCase1").style.background =="rgb(94, 194, 94)"){
            console.log("Download test case 1")
            fname = "4-WAY BSA FIFO Test Case 1"
            text += ": Test Case 1\n=====================================\n\n"
            memoryBlockLength = 256
            memorySequenceBlock = testCase1Arr
        } else if (document.getElementById("testCase2").style.background =="rgb(94, 194, 94)"){
            console.log("Download test case 2")
            fname = "4-WAY BSA FIFO Test Case 2"
            text += ": Test Case 2\n=====================================\n\n"
            memoryBlockLength = 128
            memorySequenceBlock = testCase2Arr
        } else {
            console.log("Download test case 3")
            fname = "4-WAY BSA FIFO Test Case 3"
            text += ": Test Case 3\n=====================================\n\n"
            memoryBlockLength = 376
            memorySequenceBlock = testCase3Arr
        }

        text += "Final Snapshot\n"
        text += 'Memory Access Count: ' + memoryAccessCount + '\n' +
                'Hits: '  + cacheHitCount + '\n' +
                'Hit Rate: ' + cacheHitCount/memoryAccessCount + '\n' +
                'Misses: ' + cacheMissCount + '\n' +
                'Miss Rate: ' + cacheMissCount/memoryAccessCount + '\n' +
                'Average Memory Access Time: ' + averageMemoryAccessTime + 'ns\n' +
                'Total Memory Access Time: ' + totalMemoryAccessTime + 'ns\n\n=====================================\n\n'

        text += "Cache Memory Trace\n"
        for (let i=0; i<memoryBlockLength; i++){
            text += 'Sequence: ' + memorySequenceBlock[i] + 
                    ' Status: ' + fStatus[i] + 
                    ' Set: ' +  fSet[i] +
                    ' Block: ' + fBlock[i] + '\n' 
        }

        // file object
        const file = new Blob([text], {type: 'text/plain'});
    
       // anchor link
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = fname + ".txt"
    
        // simulate link click
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();

        memorySequenceBlock = [];
    });
});