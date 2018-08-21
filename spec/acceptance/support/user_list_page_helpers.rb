# frozen_string_literal: true

module UserListPageHelper
  def page_has_basic_text
    expect(page).to have_content('County:')
  end

  def page_has_user_list_headers
    expect(page.body).to match(
      /Manage Users.*County:.*Full Name.*Status.*Last Login.*CWS Login.*Office Name/
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
    page.find('.rt-table').first('.rt-tr-group').first('.rt-td > a')
  end

  def second_user_link
    page.find('.rt-table').all('.rt-tr-group')[1].first('.rt-td > a')
  end

  def search_users(user_name)
    last_name = user_name.match(/([^,]*),/)[1]
    puts "search for #{last_name}"

    fill_in 'searchtext', with: last_name
    click_on 'Search'
  end
end
