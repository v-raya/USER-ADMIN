# frozen_string_literal: true

module UserListPageHelper
  def page_has_basic_text
    expect(page).to have_content('County:')
  end

  def page_has_user_list_headers
    expect(page.body).to match(
      /Manage Users.*County:.*Full Name.*Status.*Last Log in.*CWS Login.*Office Name.*Role/
    )
  end

  def page_count_users
    page.all('.rt-tr-group a').count
  end

  def expect_sorted_list(list)
    expect(list).to eq(list)
  end

  def users_on_page
    els = page.all('.rt-tr-group a').to_a
    els.map(&:text)
  end

  def first_user_link
    # first cell contains the link
    first_user.first.find('a')
  end

  def table_cells
    %i[full_name status last_log_in cws_login office_name role]
  end

  def first_user
    page.find('.rt-table').first('.rt-tr-group').all('.rt-td')
  end

  def second_user
    page.find('.rt-table').all('.rt-tr-group')[1].all('.rt-td')
  end

  def second_user_link
    second_user.first.find('a')
  end

  def text_values(user_row)
    user_hash = {}
    user_row.zip(table_cells) { |user_value, cell_name| user_hash[cell_name] = user_value.text }
    user_hash
  end

  def get_user_link(row_number)
    page.find('.rt-table').all('.rt-tr-group')[row_number].first('.rt-td > a')
  end

  def search_users(last_name)
    return if find_field('Search user list').value == last_name
    puts "search for '#{last_name}'"

    fill_in 'searchLastName', with: last_name
    if last_name == ''
      force_capybare_execute_react_change_script('#searchLastName',
                                                 'Search user list')
    end
    click_on 'Search'
    sleep 2
    puts "search complete"
  end

  def force_capybare_execute_react_change_script(node_id, _node_label)
    puts "force change script"
    find(node_id).send_keys('a')
    find(node_id).send_keys(:backspace)
    # execute_script "React.addons.TestUtils.Simulate.change(''#{node}'')"
  end

  def expect_valid_role(user_row)
    valid_roles = ['CWS Worker', 'County Administrator', 'CALS External Worker',
                   'State Administratoe',
                   'Office Administrator']
    expect(valid_roles).to include user_row[:role]
  end

  def deactivate_any_active_added_user
    search_users 'Auto'

    loop do
      loop do
        active_row = first_active_user_on_page
        break if active_row.nil?
        puts "deactivate user"
        deactivate_user active_row
      end
      # click next until we've seen the whole set.
      puts "click next"
      break if click_next == false
    end
  end

  def first_active_user_on_page
    page.find('.rt-table').first('.rt-tr-group', text: 'Active')
  end

  def deactivate_user(active_row)
    active_row.find('a').click
    click_on 'Edit'
    change_status 'Inactive'
    click_button 'save'
    click_on 'User List'
  end

  def click_next
    topnav = find(:xpath, "//div[@class='pagination-top']")
    nav_page = topnav.find('input[type="number"]').value.to_i
    total_pages = topnav.find('span.-totalPages').text.to_i
    if nav_page < total_pages
      topnav.find('.-next').find('button').find('span').click # doesn't work
      puts 'clicked next'
      true
    else
      puts 'no more pages'
      false
    end
  end
end
