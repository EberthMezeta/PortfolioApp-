class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # usuario invitado (no autenticado)

    if user.admin?
      can :manage, :all
    else
      can :read, User # Los usuarios pueden leer sus propios datos
      can :update, User, id: user.id # Pueden actualizar su propio perfil
      can :creat, User
      # Agregar más permisos según sea necesario
      # Por ejemplo, permitir a un usuario regular ver productos

    end
  end
end
