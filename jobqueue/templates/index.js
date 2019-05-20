
$(document).ready(function() {
    $('#add-job-button').click(function() {
        var input = $('#add-job').val();
        $(this)
            .nextAll()
            .remove();
        if (input) {
            input = JSON.stringify({ url: input });
            $.ajax({
                url: '/jobqueue/api/v1.0/queue_tasks',
                type: 'POST',
                data: input,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function(result) {
                    $('#add-job-button').after(
                        "<div class='success'>Successfully added task with URL " +
                            result['queue_task']['url'] +
                            '.</div><div>Task ID: ' +
                            result['queue_task']['id'] +
                            '</div>'
                    );
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    var HTML =
                        "<div class='error'>" + errorThrown.toString() + '</div>';
                    $('#add-job-button').after(HTML);
                }
            });
        } else {
            $(this).after("<div class='error'>Please enter a URL</div>");
        }
    });

    $('#queue-tasks-button').click(function() {
        $(this)
            .nextAll()
            .remove();
        $.ajax({
            url: '/jobqueue/api/v1.0/queue_tasks',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(result) {
                $('#queue-tasks-button').after(
                    "<div class='success'>Successfully received task list:</div><div class='tasksString'></div>"
                );
                $('.tasksString').text(JSON.stringify(result['queue_tasks']));
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var HTML =
                    "<div class='error'>" + errorThrown.toString() + '</div>';
                $('#queue-tasks-button').after(HTML);
            }
        });
    });

    $('#queue-task-button').click(function() {
        var input = $('#queue-task').val();
        $(this)
            .nextAll()
            .remove();
        if (input) {
            var taskURL = '/jobqueue/api/v1.0/queue_tasks/' + input;
            $.ajax({
                url: taskURL,
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function(result) {
                    $('#queue-task-button').after(
                        "<div class='success'>Successfully received task:</div><div class='taskString'></div>"
                    );
                    $('.taskString').text(JSON.stringify(result['queue_task']));
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    var HTML =
                        "<div class='error'>" + errorThrown.toString() + '</div>';
                    $('#queue-task-button').after(HTML);
                }
            });
        } else {
            $(this).after("<div class='error'>Please enter an ID</div>");
        }
    });

    $('#results-button').click(function() {
        $(this)
            .nextAll()
            .remove();
        $.ajax({
            url: '/jobqueue/api/v1.0/results',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(result) {
                $('#results-button').after(
                    "<div class='success'>Successfully received results list:</div><div class='resultsString'></div>"
                );
                $('.resultsString').text(JSON.stringify(result['results']));
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var HTML =
                    "<div class='error'>" + errorThrown.toString() + '</div>';
                $('#results-button').after(HTML);
            }
        });
    });

    $('#result-button').click(function() {
        var input = $('#result').val();
        $(this)
            .nextAll()
            .remove();
        if (input) {
            var resultURL = '/jobqueue/api/v1.0/results/' + input;
            $.ajax({
                url: resultURL,
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function(result) {
                    $('#result-button').after(
                        "<div class='success'>Successfully received result:</div><div class='resultString'></div>"
                    );
                    $('.resultString').text(JSON.stringify(result['result']));
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    var HTML =
                        "<div class='error'>" + errorThrown.toString() + '</div>';
                    $('#result-button').after(HTML);
                }
            });
        } else {
            $(this).after("<div class='error'>Please enter an ID</div>");
        }
    });
});