export interface ExternalUrl {
    /**The Spotify URL for the object. */
    spotify: string;
}
export interface Image {
    /**The image height in pixels. */
    height: number;
    /**The source URL of the image. */
    url: string;
    /**The image width in pixels. */
    width: number;
}
export interface AlbumRestriction {
    /**The reason for the restriction. Albums may be restricted if the content is not available in a given market, to the user’s subscription type, or when the user’s account is set to not play explicit content. Additional reasons may be added in the future. */
    reason: string;
}
export interface AlbumBase {
    /**The type of the album. */
    album_type: string;
    /**The markets in which the album is available: ISO 3166-1 alpha-2 country codes. Note that an album is considered available in a market when at least 1 of its tracks is available in that market. */
    available_markets: string[];
    /**Known external URLs for this album. */
    external_urls: ExternalUrl;
    /**A link to the Web API endpoint providing full details of the album. */
    href: string;
    /**The Spotify ID for the album. */
    id: string;
    /**The cover art for the album in various sizes, widest first. */
    images: Image[];
    /**The name of the album. In case of an album takedown, the value may be an empty string. */
    name: string;
    /**The date the album was first released. */
    release_date: string;
    /**The precision with which release_date value is known. */
    release_date_precision: string;
    /**Included in the response when a content restriction is applied. */
    restrictions: AlbumRestriction;
    /**The number of tracks in the album. */
    total_tracks: number;
    /**The object type.	 */
    type: string;
    /**The Spotify URI for the album. */
    uri: string;
}
export interface Followers {
    /**This will always be set to null, as the Web API does not support it at the moment. */
    href: string;
    /**The total number of followers. */
    total: number;
}
export interface Artist {
    /**Known external URLs for this album. */
    external_urls: ExternalUrl;
    /**Information about the followers of the artist. */
    followers: Followers;
    /**A list of the genres the artist is associated with. If not yet classified, the array is empty. */
    genres: string[];
    /**A link to the Web API endpoint providing full details of the album. */
    href: string;
    /**The Spotify ID for the album. */
    id: string;
    /**The cover art for the album in various sizes, widest first. */
    images: Image[];
    /**The name of the album. In case of an album takedown, the value may be an empty string. */
    name: string;
    /**The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist’s popularity is calculated from the popularity of all the artist’s tracks. */
    popularity: number;
    /**The object type.	 */
    type: string;
    /**The Spotify URI for the album. */
    uri: string;
}
export interface AudioFeatures {
    /**A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.	 */
    acousticness: number;
    /**A URL to access the full audio analysis of this track. An access token is required to access this data. */
    analysis_url: string;
    /**Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.	 */
    danceability: number;
    /**The duration of the track in milliseconds. */
    duration_ms: number;
    /**Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy. */
    energy: number;
    /**The Spotify ID for the track. */
    id: string;
    /**Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0. */
    instrumentalness: number;
    /**The key the track is in. Integers map to pitches using standard Pitch Class notation . E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. */
    key: number;
    /**Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.	 */
    liveness: number;
    /**The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical range between -60 and 0 db. */
    loudness: number;
    /**Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0. */
    mode: number;
    /**Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks. */
    speechiness: number;
    /**The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration. */
    tempo: number;
    /**An estimated overall time signature of a track. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). */
    time_signature: number;
    /**A link to the Web API endpoint providing full details of the track. */
    track_href: number;
    /**The object type. */
    type: string;
    /**The Spotify URI for the track. */
    uri: string;
    /**A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry). */
    valence: number;
}
export interface Category {
    /**A link to the Web API endpoint returning full details of the category. */
    href: string;
    /**The category icon, in various sizes.	 */
    icons: Image[];
    /**The Spotify category ID of the category. */
    id: string;
    /**The name of the category. */
    name: string;
}
export interface Context {
    /**External URLs for this context. */
    external_urls: ExternalUrl;
    /**A link to the Web API endpoint providing full details of the track. */
    href: string;
    /**The object type, e.g. “artist”, “playlist”, “album”, “show”. */
    type: string;
    /**The Spotify URI for the context.	 */
    uri: string;
}
export interface Copyright {
    /**The copyright text for this content.	*/
    text: string;
    /**The type of copyright: C = the copyright, P = the sound recording (performance) copyright.	 */
    type: string;
}
export interface Disallows {
    /**Interrupting playback. Optional field. */
    interrupting_playback: boolean;
    /**Pausing. Optional field. */
    pausing: boolean;
    /**Resuming. Optional field. */
    resuming: boolean;
    /**Seeking playback location. Optional field. */
    seeking: boolean;
    /**Skipping to the next context. Optional field. */
    skipping_next: boolean;
    /**Skipping to the previous context. Optional field. */
    skipping_prev: boolean;
    /**Toggling repeat context flag. Optional field. */
    toggling_repeat_context: boolean;
    /**Toggling repeat track flag. Optional field. */
    toggling_repeat_track: boolean;
    /**Toggling shuffle flag. Optional field. */
    toggling_shuffle: boolean;
    /**Transfering playback between devices. Optional field. */
    transferring_playback: boolean;
}
export interface DeviceObject {
    id: string;
    is_active: boolean;
    is_private_session: boolean;
    is_restricted: boolean;
    name: string;
    type: string;
    volume_percent: string;
}
export interface DevicesObject {
    devices: DeviceObject[]
}
export interface CurrentlyPlayingContext<T> {
    /**A Context Object. Can be null. */
    actions?: Disallows;
    /**The object type of the currently playing item. Can be one of track, episode, ad or unknown. */
    context: Context;
    /**The device that is currently active. */
    device: DeviceObject;
    /**If something is currently playing, return true. */
    is_playing: boolean;
    /**The currently playing track or episode. Can be null. */
    item?: T;
    /**Progress into the currently playing track or episode. Can be null. */
    progress_ms?: number;
    /**off, track, context */
    repeat_state: string;
    /**If shuffle is on or off. */
    shuffle_state: string;
    /** Unix Millisecond Timestamp when data was fetched. */
    timestamp: string;
}
export type CurrentlyPlayingTrackContext = CurrentlyPlayingContext<TrackObject>
export type CurrentlyPlayingEpisodeContext = CurrentlyPlayingContext<EpisodeBase>
export interface CurrentlyPlaying<T> {
    /**A Context Object. Can be null. */
    context: Context;
    /**The object type of the currently playing item. Can be one of track, episode, ad or unknown. */
    currently_playing_type: string;
    /**If something is currently playing, return true. */
    is_playing: boolean;
    /**The currently playing track or episode. Can be null.	 */
    item: T;
    /**Progress into the currently playing track or episode. Can be null. */
    progress_ms: number;
    /**Unix Millisecond Timestamp when data was fetched	 */
    timestamp: number;
}
export type CurrentlyPlayingTrack = CurrentlyPlaying<TrackObject>;
export type CurrentlyPlayingEpisode = CurrentlyPlaying<EpisodeBase>;
export interface Cursor {
    /**The cursor to use as key to find the next page of items. */
    after: string;
}
export interface CursorPaging<T> {
    /**The cursors used to find the next set of items. */
    cursors: Cursor;
    /**A link to the Web API endpoint returning the full result of the request. */
    href: string;
    /**The requested data. */
    items: T[];
    /**The maximum number of items in the response (as set in the query or by default).	 */
    limit: number;
    /**URL to the next page of items. ( null if none) */
    next: string;
    /**The total number of items available to return. */
    total: number;
}
export interface EpisodeBase {
    /**A URL to a 30 second preview (MP3 format) of the episode. null if not available. */
    audio_preview_url: string;
    /**A description of the episode. HTML tags are stripped away from this field, use html_description field in case HTML tags are needed. */
    description: string;
    /**The episode length in milliseconds. */
    duration_ms: number;
    /**Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown). */
    explicit: boolean;
    /**External URLs for this episode. */
    external_urls: ExternalUrl;
    /**A link to the Web API endpoint providing full details of the episode. */
    href: string;
    /**A description of the episode. This field may contain HTML tags. */
    html_description: string;
    /**The Spotify ID for the episode. */
    id: string;
    /**The cover art for the episode in various sizes, widest first. */
    images: Image[];
    /**True if the episode is hosted outside of Spotify’s CDN. */
    is_externally_hosted: boolean;
    /**True if the episode is playable in the given market. Otherwise false. */
    is_playable: boolean;
    /**The language used in the episode, identified by a ISO 639 code. This field is deprecated and might be removed in the future. Please use the languages field instead. */
    language: string;
    /**A list of the languages used in the episode, identified by their ISO 639-1 code.	 */
    languages: string[];
    /**The name of the episode.	 */
    name: string;
    /**The date the episode was first released, for example "1981-12-15". Depending on the precision, it might be shown as "1981" or "1981-12".	 */
    release_date: string;
    /**The precision with which release_date value is known. */
    release_date_precision: string;
    /** Included in the response when a content restriction is applied. See Restriction Object for more details.*/
    restrictions: EpisodeRestriction;
    /**The user’s most recent position in the episode. Set if the supplied access token is a user token and has the scope ‘user-read-playback-position’. */
    resume_point: ResumePoint;
    /**The object type.	 */
    tyep: string;
    /**The Spotify URI for the episode.	 */
    uri: string;
}
export interface EpisodeRestriction {
    /** The reason for the restriction. Supported values:
     * market - The content item is not available in the given market.
     * product - The content item is not available for the user’s subscription type.
     * explicit - The content item is explicit and the user’s account is set to not play explicit content.
     * Additional reasons may be added in the future. Note: If you use this field, make sure that your application safely handles unknown values.*/
    reason: string;
}
export interface Error {
    /**A short description of the cause of the error.*/
    message: string;
    /**The HTTP status code (also returned in the response header; see Response Status Codes for more information). */
    status: number
}
export interface ExplicitContentSettings {
    /**When true, indicates that explicit content should not be played. */
    filter_enabled: boolean;
    /**When true, indicates that the explicit content setting is locked and can’t be changed by the user. */
    filter_locked: boolean;
}
export interface ExternalId {
    /**International Article Number */
    ean: string;
    /**International Standard Recording Code */
    isrc: string;
    /**Universal Product Code */
    upc: string
}
export interface LinkedTrack {
    /**Known external URLs for this track. */
    external_urls: ExternalUrl;
    /**A link to the Web API endpoint providing full details of the track. */
    href: string;
    /**The Spotify ID for the track. */
    id: string;
    /**The object type: “track”.  */
    type: string
    /**The Spotify URI for the track.	 */
    uri: string;
}
export interface Paging<T> {
    /**A link to the Web API endpoint returning the full result of the request	 */
    href: string;
    /**The requested content */
    items: T[];
    /**The maximum number of items in the response (as set in the query or by default).	 */
    limit: number;
    /**URL to the next page of items. ( null if none) */
    next: string;
    /**The offset of the items returned (as set in the query or by default)	 */
    offset: number;
    /**URL to the previous page of items. ( null if none) */
    previous: string;
    /**The total number of items available to return. */
    total: number;
}
export interface PlayHistory {
    /**The context the track was played from. */
    context: Context;
    /**The date and time the track was played. */
    played_at: TimeStamp;
    /**The track the user listened to. */
    track: SimplifiedTrack;
}
export interface PlayerError {
    /**A short description of the cause of the error. */
    message: string;
    /**
     * NO_PREV_TRACK - The command requires a previous track, but there is none in the context.
     * NO_NEXT_TRACK - The command requires a next track, but there is none in the context.
     * NO_SPECIFIC_TRACK - The requested track does not exist.
     * ALREADY_PAUSED - The command requires playback to not be paused.
     * NOT_PAUSED - The command requires playback to be paused.
     * NOT_PLAYING_LOCALLY - The command requires playback on the local device.
     * NOT_PLAYING_TRACK - The command requires that a track is currently playing.
     * NOT_PLAYING_CONTEXT - The command requires that a context is currently playing.
     * ENDLESS_CONTEXT - The shuffle command cannot be applied on an endless context.
     * CONTEXT_DISALLOW - The command could not be performed on the context.
     * ALREADY_PLAYING - The track should not be restarted if the same track and context is already playing, and there is a resume point.
     * RATE_LIMITED - The user is rate limited due to too frequent track play, also known as cat-on-the-keyboard spamming.
     * REMOTE_CONTROL_DISALLOW - The context cannot be remote-controlled.
     * DEVICE_NOT_CONTROLLABLE - Not possible to remote control the device.
     * VOLUME_CONTROL_DISALLOW - Not possible to remote control the device’s volume.
     * NO_ACTIVE_DEVICE - Requires an active device and the user has none.
     * PREMIUM_REQUIRED - The request is prohibited for non-premium users.
     * UNKNOWN - Certain actions are restricted because of unknown reasons. 
     * */
    reason: string;
    /**The HTTP status code. Either 404 NOT FOUND or 403 FORBIDDEN. Also returned in the response header. */
    status: string
}
export interface Playlist {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrl;
    followers: Followers;
    href: string;
    images: Image[]
    name: string;
    owner: PublicUser;
    public: boolean;
    snapshot_id: string;
    tracks: PlaylistTrack[];
    type: string;
    uri: string;
}
export interface PlaylistTrack {
    added_at: TimeStamp;
    added_by: PublicUser;
    is_local: boolean;
    track: TrackObject | EpisodeBase;
}
export interface PlaylistTracksRef {
    href: string;
    total: number
}
export interface PrivateUser {
    country: string;
    display_name: string;
    email: string;
    explicit_content: ExplicitContentSettings;
    external_urls: ExternalUrl;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
}
export interface PublicUser {
    display_name: string;
    external_urls: ExternalUrl;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    type: string;
    uri: string;
}
export interface RecommendationSeed {
    afterFilteringSize: number;
    afterRelinkingSize: number;
    href: string;
    id: string;
    initialPoolSize: number;
    type: string;
}
export interface Recommendations {
    seeds: RecommendationSeed[];
    tracks: SimplifiedTrack[];
}
export interface ResumePoint {
    fully_played: boolean;
    resume_position_ms: number;
}
export interface SavedAlbum {
    added_at: TimeStamp;
    album: AlbumBase;
}
export interface SavedEpisode {
    added_at: TimeStamp;
    episode: EpisodeBase;
}
export interface SavedShow {
    added_at: TimeStamp;
    show: ShowBase;
}
export interface SavedTrack {
    added_at: TimeStamp;
    track: TrackObject;
}
export interface ShowBase {
    available_markets: string[];
    copyrights: Copyright[];
    descripion: string;
    explicit: boolean;
    external_urls: ExternalUrl;
    html_description: string;
    id: string;
    images: Image[];
    is_externally_hosted: boolean;
    languages: string[];
    media_type: string;
    name: string;
    publisher: string;
    type: string;
    uri: string;
}
export interface SimplifiedArtist {
    external_urls: ExternalUrl;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}
export interface SimplifiedPlaylist {
    collaborative: boolean;
    descripion: string;
    external_urls: ExternalUrl;
    href: string;
    images: Image[];
    name: string;
    owner: PublicUser;
    public: boolean;
    snapshot_id: boolean;
    tracks: PlaylistTracksRef;
    type: string;
    uri: string;
}
export interface SimplifiedTrack {
    artists: SimplifiedArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: ExternalUrl;
    href: string;
    id: string;
    is_local: boolean;
    is_playable: string;
    linked_from: LinkedTrack;
    name: string;
    preview_url: string;
    restrictions: TrackRestrictionObject;
    track_number: number;
    type: string;
    uri: string;
}
export interface TrackObject {
    album: AlbumBase;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: ExternalUrl;
    href: string;
    id: string;
    is_local: boolean;
    is_playable: string;
    linked_from: LinkedTrack;
    name: string;
    popularity: number;
    preview_url: string;
    restrictions: TrackRestrictionObject;
    track_number: number;
    type: string;
    uri: string;
}
export interface TrackRestrictionObject {
    reason: string;
}
export interface TuneableTrackObject {
    acousticness: number;
    danceability: number;
    duration_ms: number;
    energy: number;
    instrumentalness: number;
    key: number;
    liveness: number;
    loudness: number;
    mode: number;
    popuplarity: number;
    speechiness: number;
    tempo: number;
    time_signature: number;
    valence: number;
}
type TimeStamp = string;