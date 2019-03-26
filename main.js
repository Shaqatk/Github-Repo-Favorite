$(document).ready(function () {

    $('#search_form').on('submit', function (e) {
        e.preventDefault();
        let username = $('#search_user').val();
        console.log(username);

        //make request to github
        $.ajax({
            url: 'https://api.github.com/users/' + username + '/repos',
            data: {
                client_id: 'b526ade7c7407d9f39b9',
                client_secret: '88c424f22568022329399a5ec896abbbef82a201',
                per_page: 10
            }
        }).done(function (user_repos) {
            console.log(user_repos);
            let output = `
             <tr>
              <th>Name</th>
              <th>Language</th>
              <th>Latest Tag</th>
            <th></th>
          </tr>
          `;
            $.each(user_repos, function (i, repo) {
                output += `<tr id="info">
           <td><a href="${repo.html_url}"> ${repo.full_name}</a></td>
            <td>${repo.language}</td>
            <td></td>
            <td><a id="add_button" href="#">Add</a></td>
            </tr>`;
            });
            $('#repos').html(output);
        
         document.getElementById('add_button').addEventListener('click',add_repo);
        });
        
         function add_repo(){
                var rinfo= document.getElementById('info');
             var ht = $(rinfo).html();
             
             let fav_output = `
             <tr>
              <th>Name</th>
              <th>Language</th>
              <th>Latest Tag</th>
            <th></th>
          </tr>
          `;
        document.getElementById('fav_repos').innerHTML = fav_output + ht;
              console.log(rinfo);  
            };
    
        
        
        $('#search_button').click(function () {
            $(this).submit(function () {
                return false;
            })
            $('#search_form').submit();
        });
    })
    $('#search_user').keyup(function () {
        if ($(this).val().length === 0) {
            $('#repos').html(``);
        }
    });
});