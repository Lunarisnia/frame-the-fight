obs = obslua

function script_description()
	return [[<center><h2>Frame The Fight</h2></center>
           <p>Shake a source in the current scene when a hotkey is pressed. Go to <em>Settings
           </em> then <em>Hotkeys</em> to select the key combination.</p><p>Check the <a href=
           "https://github.com/obsproject/obs-studio/wiki/Scripting-Tutorial-Source-Shake.md">
           Source Shake Scripting Tutorial</a> on the OBS Wiki for more information.</p>]]
end

function send_json_to_browser(eventName, payload)
	local browser = obs.obs_get_source_by_name("Browser")
	if browser then
		print(obs.obs_source_get_id(browser))
		local cd = obs.calldata_create()
		obs.calldata_set_string(cd, "eventName", eventName)
		obs.calldata_set_string(cd, "jsonString", payload)
		obs.proc_handler_call(obs.obs_source_get_proc_handler(browser), "javascript_event", cd)

		obs.calldata_destroy(cd)
		obs.obs_source_release(browser)
		print("EVENT SENT")
	end
end

-- -------------- HOTKEY ---------------- --
function on_send_message()
	send_json_to_browser()
end

hotkey_id = obs.OBS_INVALID_HOTKEY_ID

function script_load()
	hotkey_id = obs.obs_hotkey_register_frontend(script_path(), "Send Event", on_send_message)
	local hotkey_save_array = obs.obs_data_get_array(settings, "send_event")
	obs.obs_hotkey_load(hotkey_id, hotkey_save_array)
	obs.obs_data_array_release(hotkey_save_array)
	send_json_to_browser("myTestEvent", "{}")
end

function script_save()
	local hotkey_save_array = obs.obs_hotkey_save(hotkey_id)
	obs.obs_data_set_array(settings, "send_event", hotkey_save_array)
	obs.obs_data_array_release(hotkey_save_array)
end

function script_properties()
	props = obs.obs_properties_create()

	local player1_group = obs.obs_properties_create()
	obs.obs_properties_add_text(player1_group, "player1_name", "Player Name", obs.OBS_TEXT_DEFAULT)

	obs.obs_properties_add_group(props, "player1_group", "Player 1", obs.OBS_GROUP_NORMAL, player1_group)
	-- obs.obs_properties_add_float_slider(props, "frequency", "Shake frequency", 0.1, 20, 0.1)
	-- obs.obs_properties_add_int_slider(props, "amplitude", "Shake amplitude", 0, 90, 1)
	return props
end

function script_update(settings)
	local player1_name = obs.obs_data_get_string(settings, "player1_name")
	send_json_to_browser("player1_name", string.format('{"name":"%s"}', player1_name))
end
